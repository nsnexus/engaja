// lib/payments.ts
// Lógica central de aprovação de pagamento Pix e acionamento automático da API MachinesSMM

import { getOrderById, updateOrderStatus } from "./firebase/firestore";
import type { Order } from "@/types";

export interface PaymentApprovalResult {
  applied: boolean;
  reason?: string;
  order?: Order;
  smmDispatched?: boolean;
  smmOrderId?: string | number;
}

/**
 * Dispara o pedido de engajamento na MachinesSMM API
 */
export async function dispatchSmmOrder(order: Order, env?: Record<string, any>): Promise<{ success: boolean; smmOrderId?: number | string; error?: string }> {
  const smmServiceId = order.packageSnapshot?.smmServiceId;
  const quantity = order.packageSnapshot?.quantity;
  const profile = order.profile;

  if (!smmServiceId || !quantity || !profile) {
    console.warn(`[SMM Dispatch] Pedido #${order.id} não possui smmServiceId (${smmServiceId}) ou quantidade válida.`);
    return { success: false, error: "Serviço SMM não configurado neste pacote" };
  }

  const apiKey = (env && env.MACHINESMM_API_KEY) || process.env.MACHINESMM_API_KEY || "054b04e9d3765c1c78c6b7ee01421544";
  const apiUrl = (env && env.MACHINESMM_API_URL) || process.env.MACHINESMM_API_URL || "https://machinesmm.com/api/v2";

  // Formata o link caso venha apenas o @arroba
  let targetLink = profile.trim();
  if (targetLink.startsWith("@")) {
    const network = (order.packageSnapshot?.network || "instagram").toLowerCase();
    if (network.includes("tiktok")) {
      targetLink = `https://www.tiktok.com/${targetLink}`;
    } else {
      targetLink = `https://www.instagram.com/${targetLink.replace(/^@/, "")}`;
    }
  }

  try {
    const body = new URLSearchParams({
      key: apiKey,
      action: "add",
      service: String(smmServiceId),
      link: targetLink,
      quantity: String(quantity),
    });

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(15000),
    });

    const data: any = await res.json();
    if (data.order) {
      console.log(`[SMM Dispatch] Sucesso! Pedido #${order.id} registrado no provedor SMM com ID ${data.order}`);
      return { success: true, smmOrderId: data.order };
    }

    console.warn(`[SMM Dispatch] Resposta do provedor SMM sem ID de pedido:`, data);
    return { success: false, error: data.error || "Provedor SMM não retornou ID de pedido" };
  } catch (err: any) {
    console.error(`[SMM Dispatch] Falha de comunicação com a MachinesSMM:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Aplica a aprovação do pagamento no pedido e dispara a entrega automática.
 * Idempotente contra múltiplas chamadas simultâneas (webhook + polling).
 */
export async function applyPaymentApproval(
  orderId: string,
  txid: string,
  details: { status: string; transactionAmount?: number },
  env?: Record<string, any>
): Promise<PaymentApprovalResult> {
  if (!orderId || !txid) {
    return { applied: false, reason: "Dados insuficientes (orderId/txid)" };
  }

  const order = await getOrderById(orderId);
  if (!order) {
    return { applied: false, reason: "Pedido não encontrado" };
  }

  // Idempotência: Se já estiver pago ou processando com o mesmo txid
  if (order.payment.status === "pago" || (order.payment.txid === txid && order.status !== "pendente")) {
    return { applied: false, reason: "already_processed", order };
  }

  const now = new Date();
  order.payment = {
    ...order.payment,
    status: "pago",
    method: "pix",
    txid,
    transactionId: txid,
    paidAt: now,
  };
  order.status = "processando";
  order.updatedAt = now;

  // Aciona a entrega do serviço SMM
  const smmResult = await dispatchSmmOrder(order, env);
  if (smmResult.success && smmResult.smmOrderId) {
    order.smmOrderId = smmResult.smmOrderId;
    order.smmStatus = "em_andamento";
  }

  // Persiste no banco de dados / Firestore
  try {
    await updateOrderStatus(orderId, "processando", smmResult.smmOrderId ? `SMM #${smmResult.smmOrderId}` : undefined);
  } catch (e: any) {
    console.warn(`[Payments] Falha ao persistir status atualizado no Firestore:`, e.message);
  }

  return {
    applied: true,
    order,
    smmDispatched: smmResult.success,
    smmOrderId: smmResult.smmOrderId,
  };
}
