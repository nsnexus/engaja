// app/api/smm/order/route.ts
// Cria pedido na MachinesSMM após pagamento confirmado
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const API_URL = process.env.MACHINESMM_API_URL ?? "https://machinesmm.com/api/v2";
const API_KEY = process.env.MACHINESMM_API_KEY ?? "";

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API key não configurada" }, { status: 500 });
  }

  const { serviceId, link, quantity } = await req.json() as {
    serviceId: number;
    link: string;
    quantity: number;
  };

  try {
    const body = new URLSearchParams({
      key:      API_KEY,
      action:   "add",
      service:  String(serviceId),
      link,
      quantity: String(quantity),
    });

    const res  = await fetch(API_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    body.toString(),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[SMM order]", err);
    return NextResponse.json({ error: "Falha ao criar pedido" }, { status: 502 });
  }
}
