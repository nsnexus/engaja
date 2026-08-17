"use client";
import Link from "next/link";
import { ShoppingCart, Check, Zap, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { useCart } from "@/store/cart";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { Package } from "@/types";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const { item, setItem } = useCart();
  const selected = item?.id === pkg.id;

  return (
    <article
      id={`pkg-${pkg.id}`}
      onClick={() => setItem(selected ? null : pkg)}
      className={`
        glass-card relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between
        ${selected
          ? "border-violet-500 bg-[#1C1630]/90 shadow-[0_0_30px_rgba(139,92,246,0.3)] ring-1 ring-violet-500"
          : "hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
        }
      `}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-5 z-10">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1">
            <Sparkles size={11} className="fill-black" />
            Mais Vendido
          </span>
        </div>
      )}

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.8)] z-10">
          <Check size={14} className="text-white stroke-[3]" />
        </div>
      )}

      <div>
        {/* Header with Official SVG Icon */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="p-2 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] inline-flex shadow-inner">
            <SocialIcon network={pkg.network} size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-0.5">
              {pkg.network} · {pkg.service}
            </p>
            <h3 className="text-sm font-bold text-white leading-tight truncate">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Quantity Display */}
        <div className="mb-4 bg-[#09070F]/70 border border-[rgba(255,255,255,0.06)] rounded-xl p-3.5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight num">
              {formatNumber(pkg.quantity)}
            </span>
            <span className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider">
              {pkg.service}
            </span>
          </div>
        </div>

        {/* Meta badges */}
        <div className="flex items-center gap-4 mb-6 text-xs text-[#B4ACD4]">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-violet-400" />
            {pkg.delivery || "Início imediato"}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Zap size={13} className="text-cyan-400" />
            100% Automático
          </span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
        <div>
          <p className="text-2xl font-extrabold text-white num tracking-tight">
            {formatCurrency(pkg.price)}
          </p>
          <p className="text-[10px] text-[#756B96] font-semibold uppercase">Pagamento único</p>
        </div>
        <Link
          href="/checkout"
          onClick={e => { e.stopPropagation(); setItem(pkg); }}
          id={`buy-${pkg.id}`}
        >
          <Button
            size="md"
            className="h-10 px-5 text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          >
            <ShoppingCart size={13} className="mr-1.5" />
            {selected ? "Comprar" : "Comprar"}
          </Button>
        </Link>
      </div>
    </article>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-[rgba(255,255,255,0.08)]">
      <div className="flex gap-3 mb-4">
        <div className="skeleton w-11 h-11 rounded-xl" />
        <div className="flex-1">
          <div className="skeleton h-3 w-20 rounded mb-2" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
      </div>
      <div className="skeleton h-14 w-full rounded-xl mb-4" />
      <div className="flex gap-3 mb-6">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="skeleton h-7 w-20 rounded" />
        <div className="skeleton h-9 w-24 rounded-xl" />
      </div>
    </div>
  );
}
