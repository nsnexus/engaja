// functions/api/webhooks/efi.ts
// Cloudflare Pages Function para recebimento de webhooks Pix da Efí Bank

import { getChargeStatus, type EfiEnv } from "../../../lib/efi";
import { getOrders } from "../../../lib/firebase/firestore";
import { applyPaymentApproval } from "../../../lib/payments";

interface WebhookContext {
  request: Request;
  env: EfiEnv & { EFI_WEBHOOK_SECRET?: string };
}

function isValidSecret(req: Request, env?: { EFI_WEBHOOK_SECRET?: string }): boolean {
  const expected = String(env?.EFI_WEBHOOK_SECRET || process.env.EFI_WEBHOOK_SECRET || "").trim();
  if (!expected) return true; // Se ainda não configurado, aceita
  const url = new URL(req.url);
  return url.searchParams.get("secret") === expected;
}

async function findOrderIdByTxid(txid: string): Promise<string | null> {
  try {
    const orders = await getOrders();
    const match = orders.find(
      (o) =>
        o.paymentIntentId === txid ||
        o.payment?.txid === txid ||
        o.payment?.transactionId === txid ||
        (Array.isArray(o.previousPaymentIntentIds) && o.previousPaymentIntentIds.includes(txid))
    );
    return match ? match.id : null;
  } catch (err: any) {
    console.warn("[Webhook Efí] Erro ao buscar pedido pelo txid:", err.message);
    return null;
  }
}

async function processPixItem(item: { txid?: string }, env: any) {
  const txid = item?.txid;
  if (!txid) return;

  // Revalida a cobrança diretamente na Efí antes de aprovar
  let charge;
  try {
    charge = await getChargeStatus(txid, env);
  } catch (err: any) {
    console.warn("[Webhook Efí] Falha ao confirmar cobrança na Efí:", err.message);
    return;
  }

  if (!charge || charge.status !== "CONCLUIDA") return;

  const orderId = await findOrderIdByTxid(txid);
  if (!orderId) {
    console.warn(`[Webhook Efí] Nenhum pedido encontrado para o txid ${txid}`);
    return;
  }

  const transactionAmount = Number(charge.valor?.original);
  await applyPaymentApproval(
    orderId,
    txid,
    {
      status: "approved",
      transactionAmount,
    },
    env
  );
}

export async function onRequestPost(context: WebhookContext) {
  try {
    if (!isValidSecret(context.request, context.env)) {
      console.warn("[Webhook Efí] Segredo inválido na URL, ignorando notificação.");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    let body: any = {};
    try {
      body = await context.request.json();
    } catch {}

    const items = Array.isArray(body?.pix) ? body.pix : [];
    for (const item of items) {
      await processPixItem(item, context.env);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[Webhook Efí] Erro de processamento:", error.message);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
