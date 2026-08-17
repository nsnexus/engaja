// app/api/smm/services/route.ts
// Server-side proxy — nunca expõe a API key ao client
import { NextResponse } from "next/server";

export const runtime = "edge";

const API_URL = process.env.MACHINESMM_API_URL ?? "https://machinesmm.com/api/v2";
const API_KEY = process.env.MACHINESMM_API_KEY ?? "";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "MACHINESMM_API_KEY não configurada" }, { status: 500 });
  }

  try {
    const body = new URLSearchParams({ key: API_KEY, action: "services" });
    const res  = await fetch(API_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    body.toString(),
      next:    { revalidate: 300 }, // cache 5min
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[SMM services]", err);
    return NextResponse.json({ error: "Falha ao buscar serviços da API" }, { status: 502 });
  }
}
