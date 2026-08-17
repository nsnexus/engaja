"use client";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PackageCard, PackageCardSkeleton } from "@/components/site/PackageCard";
import { usePackages } from "@/hooks/usePackages";
import { cn } from "@/lib/utils";
import { Sparkles, ShieldCheck, Zap, Layers } from "lucide-react";

const NETWORKS  = ["Todos", "Instagram", "TikTok", "YouTube", "Twitter"];
const SERVICES  = ["Todos", "Seguidores", "Curtidas", "Visualizações"];

export default function PacotesPage() {
  const { packages, loading } = usePackages();
  const [network, setNetwork]   = useState("Todos");
  const [service, setService]   = useState("Todos");

  const filtered = useMemo(() =>
    packages.filter(p =>
      (network === "Todos" || p.network === network) &&
      (service === "Todos" || p.service === service)
    ),
    [packages, network, service]
  );

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 min-h-screen relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-semibold text-violet-300 mb-4">
              <Sparkles size={13} className="text-violet-400" />
              <span>Catálogo Completo & Entrega Automática</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Escolha o pacote ideal para seu crescimento
            </h1>
            <p className="text-[#B4ACD4] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Selecione a plataforma, o tipo de engajamento e o volume desejado. O envio inicia logo após a confirmação do pagamento.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="glass-card p-4 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-[rgba(255,255,255,0.08)]">
            {/* Network Filter */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <span className="text-xs font-bold text-[#756B96] uppercase tracking-wider mr-1 hidden sm:inline">
                Rede:
              </span>
              {NETWORKS.map(n => (
                <button
                  key={n}
                  id={`filter-network-${n.toLowerCase()}`}
                  onClick={() => setNetwork(n)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                    network === n
                      ? "bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                      : "bg-[#130F20] text-[#B4ACD4] border-[rgba(255,255,255,0.08)] hover:border-violet-500/30 hover:text-white"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Service Filter */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto md:ml-auto">
              <span className="text-xs font-bold text-[#756B96] uppercase tracking-wider mr-1 hidden sm:inline">
                Serviço:
              </span>
              {SERVICES.map(s => (
                <button
                  key={s}
                  id={`filter-service-${s.toLowerCase()}`}
                  onClick={() => setService(s)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                    service === s
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : "bg-[#130F20] text-[#B4ACD4] border-[rgba(255,255,255,0.08)] hover:border-indigo-500/30 hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <PackageCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-card text-center py-20 rounded-3xl p-8 border-[rgba(255,255,255,0.08)]">
              <Layers size={40} className="text-[#756B96] mx-auto mb-4" />
              <p className="font-bold text-lg text-white">Nenhum pacote encontrado com estes filtros</p>
              <p className="text-sm text-[#B4ACD4] mt-1 mb-6">Tente selecionar outros filtros ou veja todos os pacotes.</p>
              <button
                onClick={() => { setNetwork("Todos"); setService("Todos"); }}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
