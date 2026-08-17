"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, QrCode, FileText, ArrowLeft, Lock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useCart } from "@/store/cart";
import { createOrder } from "@/lib/firebase/firestore";
import { formatCurrency } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { OrderInput, PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { id: PaymentMethod; icon: typeof QrCode; label: string; desc: string }[] = [
  { id: "pix",    icon: QrCode,      label: "Pix Instantâneo", desc: "Aprovação imediata e início em minutos" },
  { id: "cartao", icon: CreditCard,  label: "Cartão de Crédito", desc: "Até 12x no cartão" },
  { id: "boleto", icon: FileText,    label: "Boleto Bancário", desc: "Compensação em até 1 dia útil" },
];

const STEP_LABELS = ["Pacote", "Dados & Perfil", "Pagamento"];

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
  const [payment, setPayment] = useState<PaymentMethod>("pix");

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
    if (!name || !email || !profile) { setError("Preencha todos os campos obrigatórios."); return; }
    setLoading(true);
    setError("");
    try {
      const orderData: OrderInput = {
        customer: { name, email, contact },
        profile,
        packageId:       item!.id,
        packageSnapshot: item!,
        price:           item!.price,
        payment:         { method: payment, status: "aguardando" },
        status:          "pendente",
        userId:          null,
      };
      const id = await createOrder(orderData);
      clear();
      router.push(`/pedido/${id}`);
    } catch (e) {
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
                <h2 className="font-600 text-sm text-[#F0EEFF] mb-5">Seus dados</h2>
                <div className="space-y-4">
                  <Input id="checkout-name" label="Nome completo *" placeholder="João Silva" value={name} onChange={e => setName(e.target.value)} />
                  <Input id="checkout-email" label="E-mail *" type="email" placeholder="joao@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                  <Input id="checkout-contact" label="WhatsApp (opcional)" placeholder="+55 11 99999-9999" value={contact} onChange={e => setContact(e.target.value)} />
                  <Input id="checkout-profile" label="@ ou link do perfil *" placeholder="@seuperfil ou https://instagram.com/..." value={profile} onChange={e => setProfile(e.target.value)} hint="Não precisa de senha — só o link público" />
                </div>
              </div>
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                Continuar para pagamento →
              </Button>
            </div>
          )}

          {/* Step 2 — Payment */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <h2 className="font-600 text-sm text-[#F0EEFF] mb-5">Forma de pagamento</h2>
                <div className="space-y-2">
                  {PAYMENT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      id={`payment-${opt.id}`}
                      onClick={() => setPayment(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all
                        ${payment === opt.id
                          ? "border-violet-500/60 bg-violet-500/8"
                          : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${payment === opt.id ? "bg-violet-600 border-violet-600" : "bg-[#1E1830] border-[rgba(255,255,255,0.08)]"}`}>
                        <opt.icon size={16} className={payment === opt.id ? "text-white" : "text-[#A89FC8]"} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-600 ${payment === opt.id ? "text-white" : "text-[#A89FC8]"}`}>{opt.label}</p>
                        <p className="text-xs text-[#6B6184]">{opt.desc}</p>
                      </div>
                      {payment === opt.id && (
                        <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B6184]">Subtotal</span>
                  <span className="num text-[#F0EEFF]">{formatCurrency(item.price)}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-[#6B6184]">Taxa</span>
                  <span className="text-green-400 font-500">Grátis</span>
                </div>
                <div className="flex justify-between font-700 border-t border-[rgba(255,255,255,0.07)] pt-4">
                  <span className="text-[#F0EEFF]">Total</span>
                  <span className="text-lg num text-[#F0EEFF]">{formatCurrency(item.price)}</span>
                </div>
              </div>

              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <Button className="w-full" size="lg" loading={loading} onClick={handleSubmit}>
                <Lock size={14} />
                Finalizar pedido com segurança
              </Button>
              <button onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-1.5 text-xs text-[#6B6184] hover:text-[#A89FC8] transition-colors mt-1">
                <ArrowLeft size={12} /> Voltar
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
