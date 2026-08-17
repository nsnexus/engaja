"use client";
import { useState } from "react";
import { Lock, Zap, CreditCard, ShieldCheck, RefreshCw, ChevronDown, MessageCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  icon: typeof Lock;
}

const FAQS: FAQItem[] = [
  {
    q: "Preciso informar minha senha?",
    a: "Nunca! Nós jamais solicitamos sua senha ou acesso direto à sua conta. Para realizar a entrega, precisamos apenas do seu @usuário público ou do link do post que deseja impulsionar. Seu perfil fica 100% seguro durante todo o processo.",
    icon: Lock,
  },
  {
    q: "Em quanto tempo meu pedido é entregue?",
    a: "A maioria dos serviços tem início imediato de 2 a 15 minutos após a confirmação do pagamento. A entrega é feita de forma gradual e natural para garantir o máximo de segurança e engajamento orgânico para o seu perfil.",
    icon: Zap,
  },
  {
    q: "Quais são as formas de pagamento aceitas?",
    a: "Aceitamos Pix com aprovação instantânea e liberação em tempo real, cartão de crédito em até 12x com proteção antifraude e boleto bancário.",
    icon: CreditCard,
  },
  {
    q: "Existe algum risco de bloqueio para o meu perfil?",
    a: "Zero risco. Todos os nossos métodos respeitam rigorosamente os limites e diretrizes oficiais das plataformas. Não utilizamos bots invasivos, garantindo que seu perfil continue seguro e elegível para monetização.",
    icon: ShieldCheck,
  },
  {
    q: "Como funciona a garantia de reposição?",
    a: "Oferecemos garantia de reposição automática de 30 dias. Caso haja qualquer oscilação ou queda na quantidade contratada durante esse período, basta acionar nosso suporte que repomos sem nenhum custo adicional.",
    icon: RefreshCw,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          const Icon = item.icon;

          return (
            <div
              key={i}
              className={`rounded-2xl sm:rounded-3xl transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? "bg-gradient-to-b from-[#1a1433] via-[#120e24] to-[#0d0a1a] border-violet-500/50 shadow-[0_10px_35px_rgba(139,92,246,0.18)]"
                  : "bg-white/[0.025] hover:bg-white/[0.05] border-white/[0.08] hover:border-white/[0.16]"
              }`}
            >
              {/* Question Toggle Button */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 text-left cursor-pointer gap-4 transition-colors"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                        : "bg-white/[0.04] border border-white/[0.08] text-violet-400"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-base sm:text-xl text-white tracking-tight leading-snug">
                    {item.q}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? "bg-violet-600 border-violet-500 text-white rotate-180 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                      : "bg-white/[0.04] border-white/[0.08] text-[#9d99b5]"
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {/* Answer Content */}
              {isOpen && (
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-white/[0.06] animate-fade-in">
                  <p className="pt-4 sm:pt-5 text-sm sm:text-base text-[#c4bfe0] leading-relaxed max-w-3xl">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Premium WhatsApp Support Banner */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/30 via-[#130e26]/80 to-emerald-950/20 border border-violet-500/25 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <MessageCircle size={24} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">
              Ainda ficou com alguma dúvida?
            </h4>
            <p className="text-xs sm:text-sm text-[#9d99b5]">
              Nosso time de suporte está disponível 24 horas por dia para te atender.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_35px_rgba(16,185,129,0.6)] transition-all flex-shrink-0"
        >
          <MessageCircle size={18} className="fill-slate-950" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
