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
    <div className="flex flex-col min-h-screen bg-[#07060f] text-white selection:bg-violet-600 selection:text-white">
      {/* Aurora Ambient Backgrounds */}
      <div className="aurora" aria-hidden />
      <div className="aurora-3" aria-hidden />
      <div className="grain" aria-hidden />

      <Navbar />

      <main className="flex-1 w-full">
        {/* ─── Hero Section ─── */}
        <header className="hero pt-16 pb-24 relative">
          <div className="wrap hero-grid grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="pill">
                <span className="dot" />
                <span>+50 mil pedidos entregues em 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold leading-[1.08] tracking-tight mb-6 mono text-white">
                Bombe suas <span className="grad">redes sociais</span> em <span className="grad-2">minutos</span>
              </h1>

              <p className="lead text-lg text-[#9d99b5] max-w-[500px] mb-8 leading-relaxed">
                Ganhe seguidores, curtidas e visualizações com entrega rápida e segura. Sem senha, sem complicação — só crescimento de verdade.
              </p>

              <div className="hero-cta flex gap-3.5 flex-wrap justify-center lg:justify-start mb-10">
                <Link href="#pacotes" className="btn btn-grad">
                  Ver pacotes 🚀
                </Link>
                <Link href="#como" className="btn btn-glass">
                  Como funciona
                </Link>
              </div>

              <div className="trust flex items-center gap-5 flex-wrap justify-center lg:justify-start">
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
            <div className="flex justify-center w-full">
              <HeroPhone />
            </div>
          </div>
        </header>

        {/* ─── Logos Strip with Official Vector Icons ─── */}
        <div className="logos border-y border-white/[0.08] py-8 bg-white/[0.01]">
          <div className="wrap logos-in flex flex-col md:flex-row items-center justify-between gap-6">
            <small className="text-[#6f6b87] text-xs uppercase tracking-wider font-semibold text-center md:text-left">
              Impulsione em todas as redes
            </small>
            <div className="logos-row flex gap-3 sm:gap-4 items-center flex-wrap justify-center font-bold text-sm text-white">
              {["Instagram", "TikTok", "YouTube", "Facebook", "X", "Kwai"].map(net => (
                <div
                  key={net}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.15] transition-all cursor-default shadow-sm"
                >
                  <SocialIcon network={net} size={18} />
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

        {/* ─── Vantagens (Bento Grid 100% Balanced) ─── */}
        <section id="vantagens" className="py-24 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="head text-center max-w-[640px] mx-auto mb-14">
              <span className="eyebrow">Por que a EngajaPro</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono">
                Feito para <span className="grad">crescer de verdade</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Row 1: Big highlight + 1 normal card */}
              <div className="b gradient md:col-span-2 p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 shadow-[0_10px_40px_rgba(139,92,246,0.3)]">
                <div className="b-ic w-14 h-14 rounded-2xl bg-white/20 border border-white/30 grid place-items-center text-2xl mb-4">⚡</div>
                <div className="big-stat text-4xl sm:text-5xl font-extrabold text-white mono mb-2">0-3h</div>
                <h4 className="text-xl font-bold text-white mb-2">Entrega ultrarrápida</h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  A maioria dos pedidos começa a ser entregue em poucos minutos após a confirmação do pagamento.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 grid place-items-center text-2xl mb-4">🔒</div>
                  <h4 className="text-xl font-bold text-white mb-2">100% seguro</h4>
                  <p className="text-sm text-[#9d99b5] leading-relaxed">Sem senha e com pagamento criptografado. Seu perfil sempre protegido.</p>
                </div>
              </div>

              {/* Row 2: 3 balanced cards */}
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 grid place-items-center text-2xl mb-4">💬</div>
                <h4 className="text-lg font-bold text-white mb-2">Suporte 24/7</h4>
                <p className="text-sm text-[#9d99b5] leading-relaxed">Equipe pronta pra te ajudar a qualquer hora pelo WhatsApp.</p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 grid place-items-center text-2xl mb-4">♻️</div>
                <h4 className="text-lg font-bold text-white mb-2">Garantia de reposição</h4>
                <p className="text-sm text-[#9d99b5] leading-relaxed">Caiu algum número? A gente repõe sem custo no período de garantia.</p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 grid place-items-center text-2xl mb-4">🚀</div>
                <h4 className="text-lg font-bold text-white mb-2">Início Imediato</h4>
                <p className="text-sm text-[#9d99b5] leading-relaxed">Pedidos despachados automaticamente na mesma hora.</p>
              </div>

              {/* Row 3: Full Width Ecosystem Card */}
              <div className="md:col-span-3 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 grid place-items-center text-2xl mb-4">🌎</div>
                  <h4 className="text-xl font-bold text-white mb-2">Todas as redes em um só lugar</h4>
                  <p className="text-sm text-[#9d99b5] max-w-xl leading-relaxed">
                    Instagram, TikTok, YouTube, Facebook, X e Kwai. Você gerencia tudo pela mesma plataforma com transparência total.
                  </p>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {["Instagram", "TikTok", "YouTube", "Facebook", "X", "Kwai"].map(net => (
                    <span key={net} className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-white inline-flex items-center gap-2">
                      <SocialIcon network={net} size={16} />
                      <span>{net}</span>
                    </span>
                  ))}
                </div>
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

        {/* ─── Bottom CTA Banner (Generous Vertical Spacing) ─── */}
        <section className="py-20 sm:py-28 relative border-t border-white/[0.06]">
          <div className="wrap">
            <div className="relative max-w-4xl mx-auto rounded-[32px] sm:rounded-[40px] p-8 sm:p-16 text-center overflow-hidden border border-violet-500/25 bg-gradient-to-b from-[#151026] via-[#0e0b1c] to-[#07060f] shadow-[0_20px_80px_rgba(139,92,246,0.2)]">
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-bold text-violet-300 mb-6">
                <span>🚀 Comece a crescer hoje mesmo</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono max-w-xl mx-auto">
                Pronto pra fazer seu perfil <span className="grad">bombar</span>?
              </h2>

              <p className="text-[#B4ACD4] text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Junte-se a milhares de criadores e empresas que aceleraram sua autoridade e alcance nas redes sociais.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  href="#pacotes"
                  className="btn btn-grad text-base py-4 px-8 shadow-[0_10px_35px_rgba(139,92,246,0.45)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.55)]"
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

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9d99b5] pt-4 border-t border-white/[0.06] max-w-md mx-auto">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Início em minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> 100% sem senha
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Garantia de 30 dias
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
