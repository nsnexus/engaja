"use client";
import { useState } from "react";
import { Lock, Zap, CreditCard, ShieldCheck, RefreshCw, ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  icon: typeof Lock;
}

const FAQS: FAQItem[] = [
  {
    q: "Preciso informar minha senha?",
    a: "Nunca! Nós jamais solicitamos sua senha ou acesso à sua conta. Para realizar a entrega, precisamos apenas do seu @usuário público ou do link do post que deseja impulsionar.",
    icon: Lock,
  },
  {
    q: "Em quanto tempo meu pedido é entregue?",
    a: "A maioria dos serviços tem início imediato de 2 a 15 minutos após a confirmação do pagamento. O prazo estimado de conclusão varia de acordo com a quantidade e é informado em cada pacote.",
    icon: Zap,
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos Pix com aprovação instantânea e liberação em tempo real, cartão de crédito em até 12x com proteção antifraude e boleto bancário.",
    icon: CreditCard,
  },
  {
    q: "Existe algum risco de bloqueio para o meu perfil?",
    a: "Zero risco. Todos os nossos serviços respeitam os limites e as diretrizes oficiais das plataformas, com entrega gradual, segura e orgânica.",
    icon: ShieldCheck,
  },
  {
    q: "Como funciona a garantia de reposição?",
    a: "Caso haja qualquer oscilação de quantidade dentro do prazo de garantia de 30 dias do seu pacote, basta entrar em contato que realizamos a reposição gratuita automaticamente.",
    icon: RefreshCw,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-3.5">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                  ? "bg-gradient-to-r from-violet-950/40 via-[#161226]/90 to-indigo-950/30 border-violet-500/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                  : "bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.07] hover:border-white/[0.14]"
              }`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4 transition-colors"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <span
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen
                        ? "bg-violet-600/30 border border-violet-500/50 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        : "bg-white/[0.04] border border-white/[0.08] text-[#9d99b5]"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="font-bold text-base sm:text-lg text-white tracking-tight">
                    {item.q}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? "bg-violet-600 border-violet-500 text-white rotate-180 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      : "bg-white/[0.04] border-white/[0.08] text-[#9d99b5]"
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#B4ACD4] leading-relaxed border-t border-white/[0.04] animate-fade-in">
                  <p className="pt-3">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Helper Note */}
      <div className="mt-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs sm:text-sm text-[#9d99b5]">
          Ainda ficou com alguma dúvida sobre como funciona?
        </span>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 px-4 py-2 rounded-xl transition-all"
        >
          <span>Falar no WhatsApp</span>
          <span>💬</span>
        </a>
      </div>
    </div>
  );
}
