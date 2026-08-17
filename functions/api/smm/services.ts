// functions/api/smm/services.ts
// Native Cloudflare Pages Function proxy for MachinesSMM services
interface Env {
  MACHINESMM_API_KEY?: string;
  MACHINESMM_API_URL?: string;
}

export async function onRequestGet(context: { env: Env }) {
  const apiKey = context.env.MACHINESMM_API_KEY || "054b04e9d3765c1c78c6b7ee01421544";
  const apiUrl = context.env.MACHINESMM_API_URL || "https://machinesmm.com/api/v2";

  try {
    const body = new URLSearchParams({ key: apiKey, action: "services" });
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Falha ao consultar API MachinesSMM" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
