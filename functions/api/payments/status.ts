// functions/api/payments/status.ts
// Cloudflare Pages Function para verificação em tempo real do status de pagamento Pix

import { getChargeStatus, type EfiEnv } from "../../../lib/efi";
import { getOrderById } from "../../../lib/firebase/firestore";
import { applyPaymentApproval } from "../../../lib/payments";

interface PaymentStatusContext {
  request: Request;
  env: EfiEnv;
}

function jsonNoCache(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
    },
  });
}

export async function onRequestGet(context: PaymentStatusContext) {
  try {
    const url = new URL(context.request.url);
    const paymentId = url.searchParams.get("paymentId");
    const orderId = url.searchParams.get("orderId");

    // 1. Verificação rápida no estado do pedido
    if (orderId) {
      const order = await getOrderById(orderId);
      if (order) {
        if (order.payment.status === "pago" || order.status === "processando" || order.status === "concluido") {
          return jsonNoCache({ status: "approved", orderId, smmDispatched: Boolean(order.smmOrderId) });
        }
      }
    }

    const txid = paymentId;
    if (!txid) {
      return jsonNoCache({ status: "pending", error: "Parâmetros insuficientes" }, 400);
    }

    // 2. Consulta à API da Efí
    const charge = await getChargeStatus(txid, context.env);
    if (charge && charge.status === "CONCLUIDA" && orderId) {
      const transactionAmount = Number(charge.valor?.original);
      const approval = await applyPaymentApproval(
        orderId,
        txid,
        {
          status: "approved",
          transactionAmount,
        },
        context.env
      );

      return jsonNoCache({
        status: "approved",
        orderId,
        smmDispatched: approval.smmDispatched,
      });
    }

    return jsonNoCache({ status: "pending" });
  } catch (error: any) {
    console.error("[api/payments/status] Erro ao checar status:", error?.message);
    return jsonNoCache({ status: "pending", error: error?.message });
  }
}
