// functions/api/currency.ts
// Native Cloudflare Pages Function for real-time USD/BRL rate
export async function onRequestGet() {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const data: any = await res.json();
    const rate = parseFloat(data["USDBRL"]?.bid ?? "5.70");
    return new Response(JSON.stringify({ rate, source: "awesomeapi" }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new Response(JSON.stringify({ rate: 5.70, source: "fallback" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
