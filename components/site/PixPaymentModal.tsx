"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Clock, ShieldCheck, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { PixQrCode } from "@/components/ui/PixQrCode";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface PixPaymentModalProps {
  orderId: string;
  paymentId: string;
  pixCopiaECola: string;
  amount: number;
  packageTitle: string;
  onClose?: () => void;
}

export function PixPaymentModal({
  orderId,
  paymentId,
  pixCopiaECola,
  amount,
  packageTitle,
  onClose,
}: PixPaymentModalProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Copiar código Pix
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCopiaECola);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn("Falha ao copiar:", e);
    }
  };

  // Cronômetro regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Polling de status em tempo real
  useEffect(() => {
    if (isPaid) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/payments/status?orderId=${encodeURIComponent(orderId)}&paymentId=${encodeURIComponent(paymentId)}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.status === "approved" || data.status === "pago") {
            setIsPaid(true);
            if (pollingRef.current) clearInterval(pollingRef.current);
            setTimeout(() => {
              router.push(`/pedido/${orderId}`);
            }, 1800);
          }
        }
      } catch (e) {
        console.warn("[PixModal] Erro ao verificar status:", e);
      }
    };

    // Primeira verificação imediata após 2s
    const initialTimer = setTimeout(checkStatus, 2000);
    // Polling a cada 3.5 segundos
    pollingRef.current = setInterval(checkStatus, 3500);

    return () => {
      clearTimeout(initialTimer);
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [orderId, paymentId, isPaid, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0F0B18] border border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] my-8">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

        {isPaid ? (
          /* Estado de Pagamento Aprovado */
          <div className="text-center py-8 space-y-6 animate-scale-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <Check className="w-10 h-10 text-green-400 animate-bounce" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Pagamento Aprovado!</h2>
              <p className="text-sm text-[#B4ACD4] mt-2">
                Seu pedido foi confirmado e o processamento foi iniciado automaticamente.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecionando para acompanhamento...
            </div>
          </div>
        ) : (
          /* Estado de Cobrança Pix Ativa */
          <div className="space-y-6">
            {/* Topo do Modal */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold mb-3">
                <Sparkles size={13} />
                <span>Liberação Imediata</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Pague via Pix</h2>
              <p className="text-xs text-[#B4ACD4] mt-1 line-clamp-1">{packageTitle}</p>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 num">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>

            {/* Container do QR Code */}
            <div className="flex flex-col items-center justify-center p-5 bg-[#161026] rounded-2xl border border-white/10 shadow-inner">
              <PixQrCode payload={pixCopiaECola} size={190} />
              
              {/* Cronômetro */}
              <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#A89FC8]">
                <Clock size={14} className="text-violet-400" />
                <span>Expira em: <strong className="text-white num">{formattedTime}</strong></span>
              </div>
            </div>

            {/* Campo Pix Copia e Cola */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider block">
                Pix Copia e Cola
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={pixCopiaECola}
                  className="flex-1 bg-[#130E22] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white/90 font-mono truncate focus:outline-none focus:border-violet-500 select-all"
                />
                <Button
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    copied
                      ? "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:brightness-110"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copiar
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Status em Tempo Real */}
            <div className="flex items-center justify-center gap-3 p-3.5 bg-violet-500/10 border border-violet-500/20 rounded-xl">
              <Loader2 className="w-4 h-4 text-violet-400 animate-spin flex-shrink-0" />
              <span className="text-xs text-violet-200 font-medium text-center">
                Aguardando confirmação do banco... Reconhecimento instantâneo.
              </span>
            </div>

            {/* Instruções Rápidas */}
            <div className="space-y-2 text-[11px] text-[#8C82AD] bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <p className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-green-400" /> Como pagar:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Abra o aplicativo do seu banco favorito</li>
                <li>Escolha pagar via Pix (Ler QR Code ou Pix Copia e Cola)</li>
                <li>Após confirmar, esta tela atualizará automaticamente!</li>
              </ol>
            </div>

            {/* Botões de rodapé */}
            <div className="flex items-center justify-between pt-2">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#756B96] hover:text-white transition-colors"
                >
                  Fechar janela
                </button>
              )}
              <button
                type="button"
                onClick={() => router.push(`/pedido/${orderId}`)}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold inline-flex items-center gap-1 ml-auto"
              >
                Acompanhar pedido <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
