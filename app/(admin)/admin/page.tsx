"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, ShoppingCart, Package, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { getOrders, getPackages } from "@/lib/firebase/firestore";
import { Badge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { formatCurrency, formatDate, STATUS_LABELS } from "@/lib/utils";
import type { Order, Package as Pkg } from "@/types";

const STATUS_BADGE_MAP = {
  pendente:    "pending",
  processando: "processing",
  concluido:   "completed",
  cancelado:   "cancelled",
} as const;

export default function AdminDashboard() {
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([getOrders(), getPackages(false)]).then(([o, p]) => {
      setOrders(o); setPackages(p); setLoading(false);
    });
  }, []);

  if (loading) return <PageSpinner />;

  const total    = orders.reduce((acc, o) => acc + o.price, 0);
  const pending  = orders.filter(o => o.status === "pendente").length;
  const done     = orders.filter(o => o.status === "concluido").length;
  const recent   = orders.slice(0, 8);

  const STATS = [
    { label: "Receita total",     value: formatCurrency(total),       icon: TrendingUp,  sub: `${orders.length} pedidos`,       color: "violet" },
    { label: "Pendentes",         value: String(pending),             icon: Clock,        sub: "aguardando ação",                color: "warning" },
    { label: "Concluídos",        value: String(done),                icon: CheckCircle2, sub: `${((done/orders.length||0)*100).toFixed(0)}% taxa`,  color: "success" },
    { label: "Pacotes ativos",    value: String(packages.filter(p=>p.active).length), icon: Package, sub: `${packages.length} total`, color: "indigo" },
  ];

  const COLOR_MAP: Record<string, string> = {
    violet:  "text-violet-400 bg-violet-500/10 border-violet-500/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    success: "text-green-400 bg-green-500/10 border-green-500/20",
    indigo:  "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[#F0EEFF] tracking-tight mb-1">Dashboard</h1>
        <p className="text-sm text-[#6B6184]">Visão geral da plataforma em tempo real</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${COLOR_MAP[stat.color]}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-800 text-[#F0EEFF] num mb-0.5">{stat.value}</p>
            <p className="text-xs text-[#6B6184]">{stat.label}</p>
            <p className="text-[11px] text-[#3D3558] mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={15} className="text-[#6B6184]" />
            <h2 className="text-sm font-600 text-[#F0EEFF]">Pedidos recentes</h2>
          </div>
          <Link href="/admin/pedidos" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors">
            Ver todos <ArrowRight size={11} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-12 text-[#6B6184]">
            <ShoppingCart size={24} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum pedido ainda</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgba(255,255,255,0.04)]">
            {recent.map(order => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-500 text-[#F0EEFF] truncate">{order.customer.name}</p>
                  <p className="text-xs text-[#6B6184] truncate">{order.packageSnapshot.title}</p>
                </div>
                <div className="hidden sm:block text-xs text-[#6B6184] num">{formatDate(order.createdAt)}</div>
                <Badge variant={STATUS_BADGE_MAP[order.status]} dot>{STATUS_LABELS[order.status]}</Badge>
                <p className="text-sm font-600 text-[#F0EEFF] num w-20 text-right">{formatCurrency(order.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
