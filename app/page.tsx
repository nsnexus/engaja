import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { HeroPhone } from "@/components/site/HeroPhone";
import { CatalogSection } from "@/components/site/CatalogSection";
import { FAQ } from "@/components/site/FAQ";
import { SocialIcon } from "@/components/ui/SocialIcon";

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
                  <span style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80')" }} />
                  <span style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80')" }} />
                  <span style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80')" }} />
                  <span style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80')" }} />
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

        {/* ─── Logos Strip with Official Vector Icons ─── */}
        <div className="logos border-y border-white/[0.08] py-8 bg-white/[0.01]">
          <div className="wrap logos-in flex flex-col md:flex-row items-center justify-between gap-6">
            <small className="text-[#6f6b87] text-xs uppercase tracking-wider font-semibold">
              Impulsione em todas as redes
            </small>
            <div className="logos-row flex gap-4 sm:gap-6 items-center flex-wrap justify-center font-bold text-sm text-white">
              {["Instagram", "TikTok", "YouTube", "Facebook", "X", "Kwai"].map(net => (
                <div
                  key={net}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.15] transition-all cursor-default shadow-sm"
                >
                  <SocialIcon network={net} size={20} />
                  <span className="text-white font-bold">{net}</span>
                </div>
              ))}
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
        <section className="py-24 sm:py-32 relative border-t border-white/[0.06] overflow-hidden">
          <div className="wrap relative">
            {/* Background Glow Mesh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-violet-600/20 via-pink-500/15 to-blue-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="relative rounded-[32px] sm:rounded-[40px] p-10 sm:p-20 text-center overflow-hidden border border-violet-500/20 bg-gradient-to-b from-[#161226]/90 via-[#0d0b1a]/95 to-[#07060f] shadow-[0_20px_80px_rgba(139,92,246,0.15)]">
              {/* Subtle top edge highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-50" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-bold text-violet-300 mb-6">
                <span>🚀 Comece a crescer hoje mesmo</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 mono max-w-2xl mx-auto">
                Pronto pra fazer seu perfil <span className="grad">bombar</span>?
              </h2>

              <p className="text-[#B4ACD4] text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Junte-se a milhares de criadores e empresas que já aceleraram sua autoridade e alcance nas redes sociais.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  href="#pacotes"
                  className="btn btn-grad text-base sm:text-lg py-4 px-9 shadow-[0_10px_35px_rgba(139,92,246,0.45)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.55)] transition-all"
                >
                  <span>Quero impulsionar meu perfil</span>
                  <span>⚡</span>
                </Link>
                <Link
                  href="#como"
                  className="btn btn-glass text-sm sm:text-base py-4 px-8"
                >
                  Como funciona
                </Link>
              </div>

              {/* Badges Footer inside CTA */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9d99b5] pt-4 border-t border-white/[0.06] max-w-lg mx-auto">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Início em minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> 100% sem senha
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Garantia de 30 dias
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
