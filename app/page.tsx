import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { HeroPhone } from "@/components/site/HeroPhone";
import { CatalogSection } from "@/components/site/CatalogSection";
import { FAQ } from "@/components/site/FAQ";

export const metadata: Metadata = {
  title: "EngajaPro — Impulsione suas Redes Sociais com Segurança",
  description: "Ganhe seguidores, curtidas e visualizações com pacotes rápidos e 100% seguros. Sem senha, com início imediato e garantia.",
};

export default function HomePage() {
  return (
    <>
      {/* Aurora Ambient Backgrounds */}
      <div className="aurora" aria-hidden />
      <div className="aurora-3" aria-hidden />
      <div className="grain" aria-hidden />

      <Navbar />

      <main>
        {/* ─── Hero Section ─── */}
        <header className="hero pt-20 pb-28 relative">
          <div className="wrap hero-grid grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            {/* Left Content */}
            <div>
              <div className="pill">
                <span className="dot" />
                <span>+50 mil pedidos entregues em 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight mb-6 mono text-white">
                Bombe suas <span className="grad">redes sociais</span> em <span className="grad-2">minutos</span>
              </h1>

              <p className="lead text-lg sm:text-xl text-[#9d99b5] max-w-[500px] mb-9 leading-relaxed">
                Ganhe seguidores, curtidas e visualizações com entrega rápida e segura. Sem senha, sem complicação — só crescimento de verdade.
              </p>

              <div className="hero-cta flex gap-3.5 flex-wrap mb-11">
                <Link href="#pacotes" className="btn btn-grad">
                  Ver pacotes 🚀
                </Link>
                <Link href="#como" className="btn btn-glass">
                  Como funciona
                </Link>
              </div>

              <div className="trust flex items-center gap-5 flex-wrap">
                <div className="avatars flex">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <div className="stars text-[#fbbf24] text-sm">
                    ★★★★★ <small className="text-[#9d99b5] text-xs">4.9/5</small>
                  </div>
                  <small className="text-[#9d99b5] text-xs">Mais de 12 mil clientes satisfeitos</small>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="hidden lg:block">
              <HeroPhone />
            </div>
          </div>
        </header>

        {/* ─── Logos Strip ─── */}
        <div className="logos border-y border-white/[0.08] py-10 bg-white/[0.01]">
          <div className="wrap logos-in flex flex-col md:flex-row items-center justify-between gap-6">
            <small className="text-[#6f6b87] text-xs uppercase tracking-wider font-semibold">
              Impulsione em todas as redes
            </small>
            <div className="logos-row flex gap-8 sm:gap-10 items-center flex-wrap justify-center text-[#9d99b5] font-bold text-base sm:text-lg">
              <span className="hover:text-white transition-colors cursor-default">📸 Instagram</span>
              <span className="hover:text-white transition-colors cursor-default">🎵 TikTok</span>
              <span className="hover:text-white transition-colors cursor-default">▶️ YouTube</span>
              <span className="hover:text-white transition-colors cursor-default">👍 Facebook</span>
              <span className="hover:text-white transition-colors cursor-default">🐦 X</span>
              <span className="hover:text-white transition-colors cursor-default">🎬 Kwai</span>
            </div>
          </div>
        </div>

        {/* ─── Dynamic Packages Section ─── */}
        <CatalogSection />

        {/* ─── Como Funciona (4 Steps) ─── */}
        <section id="como" className="py-24 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="head text-center max-w-[640px] mx-auto mb-14">
              <span className="eyebrow">Simples assim</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono">
                Comece em <span className="grad">4 passos</span>
              </h2>
              <p className="text-[#9d99b5] text-base sm:text-lg">
                Do clique ao crescimento, sem burocracia.
              </p>
            </div>

            <div className="steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="step">
                <div className="step-n">01</div>
                <h4 className="text-lg font-bold text-white mb-2">Escolha o pacote</h4>
                <p className="text-sm text-[#9d99b5]">Selecione a rede e o pacote que combina com seu objetivo.</p>
              </div>

              <div className="step">
                <div className="step-n">02</div>
                <h4 className="text-lg font-bold text-white mb-2">Informe o perfil</h4>
                <p className="text-sm text-[#9d99b5]">Digite seu @usuário ou o link. Nunca pedimos sua senha.</p>
              </div>

              <div className="step">
                <div className="step-n">03</div>
                <h4 className="text-lg font-bold text-white mb-2">Pague com segurança</h4>
                <p className="text-sm text-[#9d99b5]">Pix, cartão ou boleto em ambiente 100% criptografado.</p>
              </div>

              <div className="step">
                <div className="step-n">04</div>
                <h4 className="text-lg font-bold text-white mb-2">Veja bombar</h4>
                <p className="text-sm text-[#9d99b5]">A entrega começa em minutos. É só acompanhar o crescimento.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Vantagens (Bento Grid) ─── */}
        <section id="vantagens" className="py-24 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="head text-center max-w-[640px] mx-auto mb-14">
              <span className="eyebrow">Por que a EngajaPro</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono">
                Feito para <span className="grad">crescer de verdade</span>
              </h2>
            </div>

            <div className="bento grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Big Highlight Bento */}
              <div className="b gradient big md:col-span-2">
                <div className="b-ic">⚡</div>
                <div className="big-stat">0-3h</div>
                <h4 className="text-xl font-bold text-white mb-2">Entrega ultrarrápida</h4>
                <p className="text-sm text-white/90">
                  A maioria dos pedidos começa a ser entregue em poucos minutos após a confirmação do pagamento.
                </p>
              </div>

              <div className="b">
                <div className="b-ic">🔒</div>
                <h4 className="text-lg font-bold text-white mb-2">100% seguro</h4>
                <p className="text-sm text-[#9d99b5]">Sem senha e com pagamento criptografado. Seu perfil sempre protegido.</p>
              </div>

              <div className="b">
                <div className="b-ic">💬</div>
                <h4 className="text-lg font-bold text-white mb-2">Suporte 24/7</h4>
                <p className="text-sm text-[#9d99b5]">Equipe pronta pra te ajudar a qualquer hora pelo WhatsApp.</p>
              </div>

              <div className="b">
                <div className="b-ic">♻️</div>
                <h4 className="text-lg font-bold text-white mb-2">Garantia de reposição</h4>
                <p className="text-sm text-[#9d99b5]">Caiu algum número? A gente repõe sem custo no período de garantia.</p>
              </div>

              <div className="b big md:col-span-2">
                <div className="b-ic">🌎</div>
                <h4 className="text-lg font-bold text-white mb-2">Todas as redes em um só lugar</h4>
                <p className="text-sm text-[#9d99b5]">
                  Instagram, TikTok, YouTube, Facebook, X e Kwai. Você gerencia tudo pela mesma plataforma, com preços transparentes e sem surpresas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section id="faq" className="py-24 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="head text-center max-w-[640px] mx-auto mb-14">
              <span className="eyebrow">Dúvidas frequentes</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono">
                Perguntas & <span className="grad">Respostas</span>
              </h2>
            </div>

            <FAQ />
          </div>
        </section>

        {/* ─── Bottom CTA Banner ─── */}
        <section className="py-20 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="cta relative rounded-[32px] p-12 sm:p-20 text-center overflow-hidden border border-white/[0.08] bg-gradient-to-br from-violet-600/15 via-pink-500/10 to-transparent">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 mono">
                Pronto pra <span className="grad">bombar</span>? 🚀
              </h2>
              <p className="text-[#9d99b5] text-base sm:text-lg mb-8 max-w-[480px] mx-auto">
                Escolha seu pacote agora e comece a crescer ainda hoje.
              </p>
              <Link href="#pacotes" className="btn btn-grad">
                Quero impulsionar meu perfil
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
