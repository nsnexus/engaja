// functions/api/payments/create.ts
// Cloudflare Pages Function para criação de cobrança Pix imediata via Efí Bank

import { createPixCharge, type EfiEnv } from "../../../lib/efi";
import { getPackageById, getOrderById } from "../../../lib/firebase/firestore";

interface CreatePaymentContext {
  request: Request;
  env: EfiEnv;
}

export async function onRequestPost(context: CreatePaymentContext) {
  try {
    const body = (await context.request.json().catch(() => ({}))) as {
      orderId?: string;
      packageId?: string;
      customerName?: string;
      customerEmail?: string;
    };

    const { orderId, packageId, customerName } = body;

    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId é obrigatório." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Busca valor seguro a partir do pedido ou pacote
    let amount = 0;
    const existingOrder = await getOrderById(orderId);
    if (existingOrder && existingOrder.price > 0) {
      amount = existingOrder.price;
    } else if (packageId) {
      const pkg = await getPackageById(packageId);
      if (pkg && pkg.price > 0) {
        amount = pkg.price;
      }
    }

    if (amount <= 0) {
      return new Response(JSON.stringify({ error: "Valor de pacote inválido ou não encontrado." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const description = `EngajaPro - Pedido #${orderId.slice(0, 8).toUpperCase()}`;
    const charge = await createPixCharge(
      {
        orderId,
        amount,
        description,
        customerName,
      },
      context.env
    );

    return new Response(
      JSON.stringify({
        paymentId: charge.txid,
        txid: charge.txid,
        status: charge.status === "CONCLUIDA" ? "approved" : "pending",
        qrCode: charge.pixCopiaECola,
        isSimulated: charge.isSimulated,
        provider: "efi",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error: any) {
    console.error("[api/payments/create] Erro ao criar cobrança Pix:", error?.message);
    return new Response(JSON.stringify({ error: "Falha ao gerar cobrança Pix na Efí." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
