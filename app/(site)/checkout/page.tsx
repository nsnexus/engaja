"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, QrCode, ArrowLeft, Lock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/store/cart";
import { createOrder } from "@/lib/firebase/firestore";
import { formatCurrency } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { PixPaymentModal } from "@/components/site/PixPaymentModal";
import { requestPixCharge } from "@/lib/pixCheckout";
import type { OrderInput } from "@/types";

const STEP_LABELS = ["Pacote", "Dados & Perfil", "Pagamento Pix"];

export default function CheckoutPage() {
  const router          = useRouter();
  const { item, clear } = useCart();
  const [step, setStep] = useState(item ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Form state
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState("");

  // Modal Pix state
  const [pixModalData, setPixModalData] = useState<{
    orderId: string;
    paymentId: string;
    pixCopiaECola: string;
    amount: number;
    packageTitle: string;
  } | null>(null);

  if (!item) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="glass-card text-center p-10 rounded-3xl max-w-md mx-6 border-[rgba(255,255,255,0.08)]">
            <p className="text-4xl mb-4">🛒</p>
            <p className="font-bold text-lg text-white mb-2">Nenhum pacote selecionado</p>
            <p className="text-xs text-[#B4ACD4] mb-6">Escolha o serviço desejado em nosso catálogo para continuar.</p>
            <Button onClick={() => router.push("/pacotes")} className="bg-gradient-to-r from-violet-600 to-indigo-600">
              Ver Pacotes Disponíveis
            </Button>
          </div>
        </main>
      </>
    );
  }

  async function handleSubmit() {
    if (!name || !email || !profile) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // 1. Criação do pedido com método Pix
      const orderData: OrderInput = {
        customer: { name, email, contact },
        profile,
        packageId:       item!.id,
        packageSnapshot: item!,
        price:           item!.price,
        payment:         { method: "pix", status: "aguardando" },
        status:          "pendente",
        userId:          null,
      };
      const orderId = await createOrder(orderData);

      // 2. Solicitação da cobrança Pix ao backend Efí Bank
      const pixRes = await requestPixCharge({
        orderId,
        packageId: item!.id,
        customerName: name,
        customerEmail: email,
      });

      if (!pixRes.ok) {
        setError(pixRes.error || "Erro ao gerar o Pix. Tente novamente.");
        setLoading(false);
        return;
      }

      clear();

      // 3. Abre o modal interativo de pagamento Pix
      setPixModalData({
        orderId,
        paymentId: pixRes.data.paymentId,
        pixCopiaECola: pixRes.data.qrCode,
        amount: item!.price,
        packageTitle: item!.title,
      });
    } catch (e: any) {
      console.error("Erro no checkout:", e);
      setError("Erro ao criar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-10">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border transition-all
                  ${i < step ? "bg-violet-600 border-violet-600 text-white" :
                    i === step ? "border-violet-500 text-violet-400 bg-violet-500/10 shadow-[0_0_10px_rgba(139,92,246,0.3)]" :
                    "border-[rgba(255,255,255,0.08)] text-[#756B96] bg-[#130F20]"}`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-bold ${i === step ? "text-white" : "text-[#756B96]"}`}>{label}</span>
                {i < STEP_LABELS.length - 1 && <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]" />}
              </div>
            ))}
          </div>

          {/* Summary card */}
          <div className="glass-card p-5 rounded-2xl mb-6 flex items-center gap-4 border-[rgba(255,255,255,0.08)]">
            <div className="p-2 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] inline-flex shadow-inner">
              <SocialIcon network={item.network} size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-0.5">{item.network} · {item.service}</p>
              <p className="font-bold text-sm text-white truncate">{item.title}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-extrabold text-white num">{formatCurrency(item.price)}</p>
              <p className="text-[10px] text-[#756B96] font-semibold">{item.delivery || "Entrega imediata"}</p>
            </div>
          </div>

          {/* Step 1 — Profile + Customer data */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <h2 className="font-semibold text-sm text-[#F0EEFF] mb-5">Seus dados de entrega</h2>
                <div className="space-y-4">
                  <Input id="checkout-profile" label="@ ou link do perfil *" placeholder="@seuperfil ou https://instagram.com/..." value={profile} onChange={e => setProfile(e.target.value)} hint="Não precisa de senha — apenas o perfil público" />
                  <Input id="checkout-name" label="Nome completo *" placeholder="João Silva" value={name} onChange={e => setName(e.target.value)} />
                  <Input id="checkout-email" label="E-mail *" type="email" placeholder="joao@email.com" value={email} onChange={e => setEmail(e.target.value)} hint="Você receberá a confirmação e comprovante por e-mail" />
                  <Input id="checkout-contact" label="WhatsApp (opcional)" placeholder="+55 11 99999-9999" value={contact} onChange={e => setContact(e.target.value)} />
                </div>
              </div>
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              <Button className="w-full" size="lg" onClick={() => {
                if (!name || !email || !profile) {
                  setError("Preencha todos os campos obrigatórios (*).");
                  return;
                }
                setError("");
                setStep(2);
              }}>
                Continuar para o Pix →
              </Button>
            </div>
          )}

          {/* Step 2 — Payment (Pix Only) */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#161222] border border-violet-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <QrCode size={18} />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-white">Pagamento Exclusivo via Pix</h2>
                      <p className="text-xs text-[#8C82AD]">Processamento instantâneo via Efí Bank</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[11px] font-bold text-green-400">
                    <Zap size={11} /> Início em minutos
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F0B18] border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#B4ACD4]">
                    <Check size={14} className="text-green-400 flex-shrink-0" />
                    <span>Aprovação automática 24 horas por dia, 7 dias por semana.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#B4ACD4]">
                    <Check size={14} className="text-green-400 flex-shrink-0" />
                    <span>Sem tarifas adicionais — você paga exatamente o valor do pacote.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#B4ACD4]">
                    <Check size={14} className="text-green-400 flex-shrink-0" />
                    <span>QR Code dinâmico e código Pix Copia e Cola gerados na hora.</span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B6184]">Subtotal</span>
                  <span className="num text-[#F0EEFF]">{formatCurrency(item.price)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#6B6184]">Taxa de Processamento</span>
                  <span className="text-green-400 font-semibold">Grátis (0%)</span>
                </div>
                <div className="flex justify-between font-bold border-t border-[rgba(255,255,255,0.07)] pt-4">
                  <span className="text-[#F0EEFF]">Total a Pagar</span>
                  <span className="text-xl num text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-black">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              </div>

              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <Button
                className="w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:brightness-110 shadow-[0_0_25px_rgba(139,92,246,0.3)] text-white font-bold py-4 text-base"
                size="lg"
                loading={loading}
                onClick={handleSubmit}
              >
                <Lock size={16} />
                Gerar QR Code Pix Seguro
              </Button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-[#6B6184] hover:text-[#A89FC8] transition-colors mt-2"
              >
                <ArrowLeft size={12} /> Voltar para dados
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Pagamento Pix com QR Code e Polling */}
      {pixModalData && (
        <PixPaymentModal
          orderId={pixModalData.orderId}
          paymentId={pixModalData.paymentId}
          pixCopiaECola={pixModalData.pixCopiaECola}
          amount={pixModalData.amount}
          packageTitle={pixModalData.packageTitle}
          onClose={() => {
            router.push(`/pedido/${pixModalData.orderId}`);
          }}
        />
      )}
    </>
  );
}
