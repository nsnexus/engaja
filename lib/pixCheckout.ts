// lib/pixCheckout.ts
// Utilitário de requisição de cobrança Pix no navegador com retentativas

const DEFAULT_ATTEMPTS = 3;

export interface PixChargeResponse {
  paymentId: string;
  txid: string;
  status: string;
  qrCode: string;
  expiresIn?: number;
  provider?: string;
  isSimulated?: boolean;
}

export interface RequestPixParams {
  orderId: string;
  packageId: string;
  customerName?: string;
  customerEmail?: string;
}

/**
 * Solicita a criação de uma cobrança Pix ao backend com mecanismo de retentativa.
 */
export async function requestPixCharge(
  params: RequestPixParams,
  options: { attempts?: number; onRetry?: (tentativa: number) => void } = {}
): Promise<{ ok: true; data: PixChargeResponse } | { ok: false; error: string }> {
  const attempts = options.attempts ?? DEFAULT_ATTEMPTS;
  let ultimoErro = "Não foi possível gerar a chave Pix no momento.";

  for (let tentativa = 1; tentativa <= attempts; tentativa++) {
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = (await res.json()) as PixChargeResponse;
        return { ok: true, data };
      }

      const errData = await res.json().catch(() => ({}));
      ultimoErro = errData?.error || errData?.message || ultimoErro;

      if (res.status >= 400 && res.status < 500 && res.status !== 424) {
        return { ok: false, error: ultimoErro };
      }
    } catch (err: any) {
      console.warn(`[PixCheckout] Tentativa ${tentativa} falhou:`, err?.message);
      ultimoErro = "Falha de conexão com o servidor de pagamento.";
    }

    if (tentativa < attempts) {
      if (options.onRetry) options.onRetry(tentativa);
      await new Promise((resolve) => setTimeout(resolve, 1500 * tentativa));
    }
  }

  return { ok: false, error: ultimoErro };
}
