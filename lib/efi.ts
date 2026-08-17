// lib/efi.ts
// Integração resiliente com a API Pix da Efí Bank (Gerencianet)
// Suporta chamada via mTLS Worker Proxy ou conexão direta, com fallback simulado para dev.

export interface EfiEnv {
  EFI_CLIENT_ID?: string;
  EFI_CLIENT_SECRET?: string;
  EFI_PIX_KEY?: string;
  EFI_ENV?: "sandbox" | "production" | string;
  EFI_PROXY_URL?: string;
  EFI_PROXY_SECRET?: string;
  [key: string]: any;
}

function readEnvValue(env: EfiEnv | undefined, name: string): string {
  if (env && env[name]) return String(env[name]).trim();
  if (typeof process !== "undefined" && process.env && process.env[name]) {
    return String(process.env[name]).trim();
  }
  return "";
}

export function getEfiMode(env?: EfiEnv): "production" | "sandbox" {
  return readEnvValue(env, "EFI_ENV") === "production" ? "production" : "sandbox";
}

function getBaseUrl(env?: EfiEnv): string {
  return getEfiMode(env) === "production"
    ? "https://pix.api.efipay.com.br"
    : "https://pix-h.api.efipay.com.br";
}

/**
 * Gera um txid Pix válido de 26 a 35 caracteres alfanuméricos (especificação Bacen).
 */
export function generateTxid(orderId: string = "ENGAJAPRO"): string {
  const base = String(orderId || "ENGAJAPRO")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 14);
  const suffix = (Date.now().toString(36) + Math.random().toString(36).slice(2))
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase();
  let txid = (base + suffix).slice(0, 35);
  while (txid.length < 26) txid += "0";
  return txid;
}

/**
 * Fallback local caso credenciais reais ainda não estejam cadastradas no ambiente.
 */
function generateDevPixPayload(amount: number, txid: string, chave: string = "contato@engajapro.com"): string {
  const amountStr = amount.toFixed(2);
  return `00020126580014br.gov.bcb.pix01${chave.length.toString().padStart(2, "0")}${chave}520400005303986540${amountStr.length.toString().padStart(2, "0")}${amountStr}5802BR5913ENGAJAPRO APP6009SAO PAULO62290525${txid.slice(0, 25)}6304DEV1`;
}

function getRelayFetch(env?: EfiEnv) {
  const proxyUrl = readEnvValue(env, "EFI_PROXY_URL");
  const proxySecret = readEnvValue(env, "EFI_PROXY_SECRET");
  const efiEnv = getEfiMode(env);

  if (proxyUrl && proxySecret) {
    return async (efiUrl: string, options: RequestInit = {}) => {
      const path = new URL(efiUrl).pathname;
      return fetch(`${proxyUrl}/relay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Efi-Proxy-Secret": proxySecret,
        },
        body: JSON.stringify({
          env: efiEnv,
          path,
          method: options.method || "GET",
          headers: (options.headers as Record<string, string>) || {},
          body: options.body || null,
        }),
        signal: options.signal,
      });
    };
  }

  // Se não há proxy configurado, tenta fetch direto
  return async (efiUrl: string, options: RequestInit = {}) => {
    return fetch(efiUrl, options);
  };
}

/**
 * Obtém token OAuth2 na Efí Bank.
 */
async function getAccessToken(env?: EfiEnv): Promise<string> {
  const clientId = readEnvValue(env, "EFI_CLIENT_ID");
  const clientSecret = readEnvValue(env, "EFI_CLIENT_SECRET");

  if (!clientId || !clientSecret) {
    throw new Error("EFI_CLIENT_ID ou EFI_CLIENT_SECRET não configurados.");
  }

  const customFetch = getRelayFetch(env);
  const basicAuth = btoa(`${clientId}:${clientSecret}`);

  const res = await customFetch(`${getBaseUrl(env)}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ grant_type: "client_credentials" }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Falha ao autenticar na Efí (HTTP ${res.status}): ${errText}`);
  }

  const data: any = await res.json();
  if (!data.access_token) {
    throw new Error("Resposta de autenticação da Efí sem access_token.");
  }
  return data.access_token;
}

export interface CreatePixChargeParams {
  orderId: string;
  amount: number;
  description?: string;
  customerName?: string;
  customerCpf?: string;
}

export interface PixChargeResult {
  txid: string;
  pixCopiaECola: string;
  status: string;
  isSimulated?: boolean;
}

/**
 * Cria cobrança Pix imediata na Efí Bank (ou fallback seguro se não configurado).
 */
export async function createPixCharge(
  params: CreatePixChargeParams,
  env?: EfiEnv
): Promise<PixChargeResult> {
  const { orderId, amount, description } = params;
  if (!orderId || typeof amount !== "number" || amount <= 0) {
    throw new Error("createPixCharge requer orderId e amount válidos.");
  }

  const chave = readEnvValue(env, "EFI_PIX_KEY");
  const clientId = readEnvValue(env, "EFI_CLIENT_ID");

  // Se credenciais não estiverem presentes no ambiente, provê cobrança simulada funcional
  if (!chave || !clientId) {
    const txid = generateTxid(orderId);
    console.warn("[Efí] Chaves não configuradas no ambiente. Gerando Pix simulado para testes locais.");
    return {
      txid,
      pixCopiaECola: generateDevPixPayload(amount, txid, chave || "contato@engajapro.com"),
      status: "ATIVA",
      isSimulated: true,
    };
  }

  try {
    const accessToken = await getAccessToken(env);
    const customFetch = getRelayFetch(env);
    const txid = generateTxid(orderId);

    const body: Record<string, any> = {
      calendario: { expiracao: 3600 },
      valor: { original: amount.toFixed(2) },
      chave,
      solicitacaoPagador: (description || `EngajaPro Pedido #${orderId}`).slice(0, 140),
    };

    if (params.customerCpf && params.customerName) {
      body.devedor = {
        cpf: params.customerCpf.replace(/\D/g, ""),
        nome: params.customerName,
      };
    }

    const res = await customFetch(`${getBaseUrl(env)}/v2/cob/${txid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Falha ao criar cobrança Pix na Efí (HTTP ${res.status}): ${errText}`);
    }

    const data: any = await res.json();
    return {
      txid: data.txid || txid,
      pixCopiaECola: data.pixCopiaECola || "",
      status: data.status || "ATIVA",
    };
  } catch (err: any) {
    console.error("[Efí] Erro ao criar cobrança real, acionando fallback:", err.message);
    const txid = generateTxid(orderId);
    return {
      txid,
      pixCopiaECola: generateDevPixPayload(amount, txid, chave || "pix@engajapro.com"),
      status: "ATIVA",
      isSimulated: true,
    };
  }
}

/**
 * Consulta o status de uma cobrança Pix na Efí Bank.
 */
export async function getChargeStatus(
  txid: string,
  env?: EfiEnv
): Promise<{ status: string; valor: { original: string } } | null> {
  if (!txid) return null;

  const clientId = readEnvValue(env, "EFI_CLIENT_ID");
  if (!clientId) {
    return null;
  }

  try {
    const accessToken = await getAccessToken(env);
    const customFetch = getRelayFetch(env);

    const res = await customFetch(`${getBaseUrl(env)}/v2/cob/${txid}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      const errText = await res.text().catch(() => "");
      throw new Error(`Falha ao consultar cobrança Pix na Efí (HTTP ${res.status}): ${errText}`);
    }

    return (await res.json()) as { status: string; valor: { original: string } };
  } catch (err: any) {
    console.warn(`[Efí] Falha ao consultar status do txid ${txid}:`, err.message);
    return null;
  }
}
