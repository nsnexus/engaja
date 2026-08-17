"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatNumber } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Zap, Heart, Users, Play, MessageSquare, Repeat } from "lucide-react";
import type { Package } from "@/types";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { setItem } = useCart();

  function getServiceIcon(service: string) {
    const s = (service || "").toLowerCase();
    if (s.includes("seguidor") || s.includes("inscrito")) return <Users className="text-violet-400" size={28} />;
    if (s.includes("curtida")) return <Heart className="text-pink-400 fill-pink-400/20" size={28} />;
    if (s.includes("visualiza") || s.includes("view")) return <Play className="text-cyan-400 fill-cyan-400/20" size={28} />;
    if (s.includes("coment")) return <MessageSquare className="text-amber-400" size={28} />;
    if (s.includes("compartilh")) return <Repeat className="text-emerald-400" size={28} />;
    return <Zap className="text-violet-400" size={28} />;
  }

  return (
    <div
      id={`pkg-${pkg.id}`}
      className={`card ${pkg.popular ? "featured" : ""} flex flex-col justify-between group`}
    >
      {pkg.popular && (
        <span className="ribbon">🔥 Popular</span>
      )}

      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="card-net inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-white">
            <SocialIcon network={pkg.network} size={16} />
            <span>{pkg.network}</span>
          </span>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
          {getServiceIcon(pkg.service)}
        </div>

        <h3 className="text-xl font-bold text-white mb-1 mono">
          {pkg.title}
        </h3>
        <div className="svc text-sm text-[#9d99b5] mb-5">
          {formatNumber(pkg.quantity)} {pkg.service.toLowerCase()}
        </div>
      </div>

      <div>
        <div className="price flex items-baseline gap-1.5 mb-1.5">
          <span className="cur text-sm text-[#9d99b5] font-semibold">R$</span>
          <span className="val text-3xl font-extrabold text-white mono num">
            {pkg.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="del text-xs font-bold text-[#a3e635] flex items-center gap-1.5 my-3">
          <span>⚡</span>
          <span>Entrega em {pkg.delivery || "0-3h"}</span>
        </div>

        <Link
          href="/checkout"
          onClick={() => setItem(pkg)}
          id={`buy-${pkg.id}`}
          className="btn btn-grad w-full justify-center text-center mt-2"
        >
          Comprar agora
        </Link>
      </div>
    </div>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="w-24 h-6 bg-white/[0.06] rounded-full mb-4" />
      <div className="w-12 h-12 bg-white/[0.06] rounded-2xl mb-4" />
      <div className="w-3/4 h-6 bg-white/[0.06] rounded-md mb-2" />
      <div className="w-1/2 h-4 bg-white/[0.06] rounded-md mb-6" />
      <div className="w-24 h-8 bg-white/[0.06] rounded-md mb-4" />
      <div className="w-full h-12 bg-white/[0.08] rounded-full mt-4" />
    </div>
  );
}
