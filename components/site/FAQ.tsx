"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Preciso informar minha senha?",
    a: "Nunca! Basta informar seu @usuário ou o link da publicação. Seu perfil fica 100% seguro e protegido.",
  },
  {
    q: "Em quanto tempo recebo?",
    a: "A maioria dos pedidos tem início imediato (em menos de 2 minutos). O prazo exato de conclusão aparece em cada card de pacote.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Pix com aprovação instantânea, cartão de crédito em até 12x e boleto bancário, sempre em ambiente 100% seguro.",
  },
  {
    q: "Existe risco para a minha conta?",
    a: "Usamos métodos seguros que respeitam integralmente os limites operacionais das redes sociais, sem risco de ban ou penalizações.",
  },
  {
    q: "O serviço possui garantia de reposição?",
    a: "Sim! Se houver qualquer oscilação ou queda dentro do período de garantia do pacote, repomos sem nenhum custo adicional.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="faq max-w-[800px] mx-auto">
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`faq-i transition-all ${isOpen ? "open" : ""}`}
          >
            <div
              className="faq-q flex justify-between items-center p-6 cursor-pointer font-semibold text-base text-white"
              onClick={() => toggle(i)}
            >
              <span>{item.q}</span>
              <span className="ic w-7 h-7 rounded-lg flex items-center justify-center font-bold text-lg text-violet-300 transition-transform">
                {isOpen ? "×" : "+"}
              </span>
            </div>
            {isOpen && (
              <div className="faq-a text-sm text-[#9d99b5] px-6 pb-6 animate-fade-in leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
