// app/api/currency/route.ts
// Cotação USD→BRL em tempo real via AwesomeAPI (sem chave necessária)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res  = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL", {
      next: { revalidate: 300 }, // cache 5 minutos
    });
    const data = await res.json();
    const rate = parseFloat(data["USDBRL"]?.bid ?? "5.70");
    return NextResponse.json({ rate, source: "awesomeapi", updatedAt: new Date().toISOString() });
  } catch {
    // fallback se API estiver fora
    return NextResponse.json({ rate: 5.70, source: "fallback" });
  }
}
