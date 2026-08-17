import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, Star, TrendingUp, Clock, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

export const metadata: Metadata = {
  title: "EngajaPro — Cresça nas Redes Sociais de Forma Rápida e Segura",
  description: "Compre seguidores, curtidas e visualizações reais para Instagram, TikTok, YouTube e mais. Entrega em minutos, sem senha e com garantia.",
};

const STATS = [
  { value: "50k+",   label: "Clientes Satisfeitos", desc: "Criadores e empresas" },
  { value: "2.4M+",  label: "Pedidos Entregues",     desc: "100% automatizado" },
  { value: "99.9%",  label: "Taxa de Sucesso",       desc: "Zero bloqueios" },
  { value: "< 2min", label: "Início Imediato",       desc: "Velocidade máxima" },
];

const NETWORKS = [
  {
    network: "Instagram",
    name: "Instagram",
    badge: "Mais Popular 🔥",
    services: ["Seguidores Brasileiros", "Curtidas Rápidas", "Visualizações Reels"],
  },
  {
    network: "TikTok",
    name: "TikTok",
    badge: "Em Alta ⚡",
    services: ["Seguidores Ativos", "Visualizações Virais", "Curtidas em Vídeos"],
  },
  {
    network: "YouTube",
    name: "YouTube",
    badge: "Monetização 🎬",
    services: ["Inscritos Reais", "Visualizações Retenção", "Likes em Vídeos"],
  },
  {
    network: "Twitter",
    name: "X (Twitter)",
    badge: "Autoridade 🚀",
    services: ["Seguidores Segmentados", "Retweets Rápidos", "Curtidas"],
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Entrega Instantânea",
    desc: "Nosso sistema é 100% automatizado. Assim que o pagamento é aprovado, o envio é iniciado em menos de 2 minutos.",
    accent: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: Shield,
    title: "100% Seguro & Sigiloso",
    desc: "Nunca solicitamos sua senha ou acesso à conta. Apenas o link público ou @ do perfil.",
    accent: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: Users,
    title: "Perfis Reais e Qualificados",
    desc: "Engajamento genuíno com alta retenção para turbinar seu alcance orgânico sem risco de penalização.",
    accent: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: TrendingUp,
    title: "Aceleração de Algoritmo",
    desc: "O volume inicial de engajamento sinaliza relevância às plataformas, impulsionando suas publicações para a aba Explorar e For You.",
    accent: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    icon: Clock,
    title: "Garantia com Reposição",
    desc: "Se houver qualquer queda na contagem dentro do período de garantia, repomos automaticamente sem custo adicional.",
    accent: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  },
  {
    icon: Star,
    title: "Suporte VIP Humanizado",
    desc: "Time de especialistas disponível via WhatsApp e e-mail para tirar dúvidas e acompanhar cada etapa do seu pedido.",
    accent: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 sm:pt-36">

        {/* ─── Hero Section ─── */}
        <section className="relative pb-24 overflow-hidden">
          {/* Ambient Lighting Mesh */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto px-6 text-center">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-bold text-violet-300 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles size={14} className="text-violet-400 animate-pulse" />
              <span>Plataforma Líder de Engajamento Real no Brasil</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-6 pt-2">
              Cresça nas redes sociais <br className="hidden sm:inline" />
              <span className="gradient-text-vibrant">de forma inteligente e veloz</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-[#B4ACD4] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Seguidores brasileiros, curtidas reais e visualizações para <strong className="text-white font-semibold">Instagram, TikTok e YouTube</strong>. Sem senha, com início imediato e garantia total.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="/pacotes" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all">
                  Ver Todos os Pacotes
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/pacotes" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto h-13 px-8 text-base font-medium rounded-xl border-[rgba(255,255,255,0.12)] bg-[#130F20]/80 backdrop-blur-md hover:border-violet-500/40 text-white">
                  Rastrear um Pedido
                </Button>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#B4ACD4] mb-16">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Sem necessidade de senha</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Pagamento Seguro via Pix</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Reposição Automática</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-5 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl group-hover:bg-violet-600/20 transition-all pointer-events-none" />
                  <p className="text-2xl sm:text-3xl font-extrabold text-white num mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-violet-300 mb-0.5">{stat.label}</p>
                  <p className="text-[11px] text-[#756B96]">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Networks Showcase ─── */}
        <section className="py-20 border-t border-[rgba(255,255,255,0.06)] relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Redes Sociais</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Selecione a sua plataforma
              </h2>
              <p className="text-sm text-[#B4ACD4] mt-2 max-w-lg mx-auto">
                Temos soluções sob medida para cada tipo de perfil e objetivo de crescimento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {NETWORKS.map(net => (
                <Link href="/pacotes" key={net.name} className="group">
                  <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between hover:-translate-y-1.5 transition-all relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-2.5 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] inline-flex shadow-inner">
                          <SocialIcon network={net.network} size={32} />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                          {net.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                        {net.name}
                      </h3>
                      <ul className="space-y-1.5 mb-6">
                        {net.services.map((s, idx) => (
                          <li key={idx} className="text-xs text-[#B4ACD4] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)] text-xs font-bold text-violet-400 group-hover:text-violet-300">
                      <span>Ver pacotes</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features Grid ─── */}
        <section className="py-20 border-t border-[rgba(255,255,255,0.06)] relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Diferenciais</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Por que escolher o EngajaPro?
              </h2>
              <p className="text-sm text-[#B4ACD4] mt-2 max-w-lg mx-auto">
                Tecnologia de ponta para entregar a melhor experiência de crescimento digital do mercado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <div key={i} className="glass-card p-7 rounded-2xl hover:border-violet-500/30 transition-all">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${f.accent}`}>
                    <f.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-[#B4ACD4] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA Banner ─── */}
        <section className="py-20 border-t border-[rgba(255,255,255,0.06)]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="glass-card p-10 sm:p-14 rounded-3xl relative overflow-hidden text-center border-violet-500/30 bg-gradient-to-b from-[#1C1630]/90 to-[#130F20]/90 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Pronto para transformar seu perfil hoje?
              </h2>
              <p className="text-sm sm:text-base text-[#B4ACD4] max-w-xl mx-auto mb-8">
                Junte-se a mais de 50.000 criadores de conteúdo e empresas que aceleram seus resultados diariamente com o EngajaPro.
              </p>
              <Link href="/pacotes">
                <Button size="lg" className="h-13 px-9 text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                  Começar Agora — É Rápido e Seguro
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
