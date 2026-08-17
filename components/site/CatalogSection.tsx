"use client";
import { useState, useMemo } from "react";
import { usePackages } from "@/hooks/usePackages";
import { PackageCard, PackageCardSkeleton } from "@/components/site/PackageCard";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Globe } from "lucide-react";

export function CatalogSection() {
  const { packages, loading } = usePackages();
  const [filter, setFilter] = useState("Todos");

  const networks = useMemo(() => {
    const available = Array.from(new Set(packages.map(p => p.network)));
    return ["Todos", ...available];
  }, [packages]);

  const filtered = useMemo(() => {
    if (filter === "Todos") return packages;
    return packages.filter(p => p.network === filter);
  }, [packages, filter]);

  return (
    <section id="pacotes" className="py-24 relative">
      <div className="wrap">
        <div className="head text-center max-w-[640px] mx-auto mb-14">
          <span className="eyebrow">Nossos pacotes</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 mono">
            Escolha o seu <span className="grad">impulso ideal</span>
          </h2>
          <p className="text-[#9d99b5] text-base sm:text-lg">
            Pacotes para todas as redes, com entrega rápida e preço justo. Filtre pela plataforma.
          </p>
        </div>

        {/* Platform Filters with Official Vector Icons */}
        <div className="filters flex gap-2.5 justify-center flex-wrap mb-12">
          {networks.map(n => (
            <button
              key={n}
              onClick={() => setFilter(n)}
              className={`f-btn flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all ${
                n === filter
                  ? "active shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
                  : "bg-white/[0.03] hover:bg-white/[0.08] text-[#9d99b5] hover:text-white border-white/[0.08]"
              }`}
            >
              {n === "Todos" ? (
                <Globe size={18} className="text-violet-400" />
              ) : (
                <SocialIcon network={n} size={18} />
              )}
              <span>{n}</span>
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="pkgs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <PackageCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8">
            <p className="text-3xl mb-2">📦</p>
            <p className="text-lg font-bold text-white mb-2">Nenhum pacote encontrado para esta rede</p>
            <button onClick={() => setFilter("Todos")} className="btn btn-glass btn-sm mt-3">
              Ver todos os pacotes
            </button>
          </div>
        ) : (
          <div className="pkgs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
