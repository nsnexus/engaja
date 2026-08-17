"use client";
export const runtime = "edge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, Check, XCircle, Loader2, Package, User, CreditCard } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useOrder } from "@/hooks/useOrder";
import { formatCurrency, formatDate, STATUS_LABELS } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { OrderStatus } from "@/types";

const STATUS_STEPS: OrderStatus[] = ["pendente", "processando", "concluido"];

const STATUS_BADGE_MAP: Record<OrderStatus, "pending" | "processing" | "completed" | "cancelled"> = {
  pendente:    "pending",
  processando: "processing",
  concluido:   "completed",
  cancelado:   "cancelled",
};

const PROGRESS_MAP: Record<OrderStatus, number> = {
  pendente:    15,
  processando: 55,
  concluido:   100,
  cancelado:   0,
};

export default function PedidoPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const { order, loading } = useOrder(id);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={32} className="text-violet-500 animate-spin" />
            <p className="text-sm text-[#756B96] font-medium">Buscando status do pedido...</p>
          </div>
        </main>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="glass-card text-center p-10 rounded-3xl max-w-md mx-6 border-[rgba(255,255,255,0.08)]">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-bold text-lg text-white mb-2">Pedido não encontrado</p>
            <p className="text-xs text-[#B4ACD4] mb-6">Verifique o código ou link informado no seu comprovante.</p>
            <Link href="/pacotes"><Button className="bg-gradient-to-r from-violet-600 to-indigo-600">Ver Catálogo</Button></Link>
          </div>
        </main>
      </>
    );
  }

  const progress = PROGRESS_MAP[order.status] ?? 0;
  const cancelled = order.status === "cancelado";

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="max-w-xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">
              {order.status === "concluido" ? "🎉" : cancelled ? "❌" : "⚡"}
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">
              {order.status === "concluido" ? "Pedido entregue com sucesso!" : cancelled ? "Pedido cancelado" : "Pedido em andamento"}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={STATUS_BADGE_MAP[order.status]} dot>
                {STATUS_LABELS[order.status]}
              </Badge>
              <span className="text-xs text-[#756B96] num font-bold">#{order.id.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>

          {/* ─── Signature: Pulse delivery bar ─── */}
          {!cancelled && (
            <div className="glass-card p-6 rounded-2xl mb-5 border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider">Progresso da Entrega</p>
                <span className="text-xs font-extrabold num text-violet-400">{progress}%</span>
              </div>
              <div
                className="pulse-bar"
                style={{ "--progress-width": `${progress}%` } as React.CSSProperties}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <div className="flex justify-between mt-4">
                {STATUS_STEPS.map((s, i) => {
                  const done    = STATUS_STEPS.indexOf(order.status) >= i;
                  const current = STATUS_STEPS.indexOf(order.status) === i;
                  return (
                    <div key={s} className="flex flex-col items-center gap-1.5">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center border text-[11px] font-bold transition-all
                        ${done ? "bg-violet-600 border-violet-600 text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]" : "border-[rgba(255,255,255,0.1)] text-[#756B96] bg-[#130F20]"}`}>
                        {done && !current ? <Check size={12} /> : i + 1}
                      </div>
                      <p className={`text-[11px] font-bold capitalize ${current ? "text-violet-300" : done ? "text-white" : "text-[#756B96]"}`}>
                        {STATUS_LABELS[s]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Package info */}
          <div className="glass-card p-6 rounded-2xl mb-5 border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2 mb-4">
              <Package size={15} className="text-violet-400" />
              <p className="text-xs font-bold text-white uppercase tracking-wider">Detalhes do Pacote</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] inline-flex shadow-inner">
                <SocialIcon network={order.packageSnapshot.network} size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-0.5">{order.packageSnapshot.network} · {order.packageSnapshot.service}</p>
                <p className="font-bold text-base text-white truncate">{order.packageSnapshot.title}</p>
                <p className="text-xs text-[#B4ACD4] mt-0.5">Perfil: <strong className="text-white">{order.profile}</strong></p>
              </div>
              <p className="font-extrabold text-lg text-white num">{formatCurrency(order.price)}</p>
            </div>
          </div>

          {/* Customer */}
          <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-[#6B6184]" />
              <p className="text-xs font-600 text-[#A89FC8] uppercase tracking-wider">Cliente</p>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6B6184]">Nome</span>
                <span className="text-[#F0EEFF]">{order.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6184]">E-mail</span>
                <span className="text-[#A89FC8]">{order.customer.email}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={14} className="text-[#6B6184]" />
              <p className="text-xs font-600 text-[#A89FC8] uppercase tracking-wider">Pagamento</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6184] capitalize">{order.payment.method}</span>
              <Badge variant={order.payment.status === "pago" ? "completed" : "pending"} dot>
                {order.payment.status === "pago" ? "Pago" : order.payment.status === "aguardando" ? "Aguardando" : order.payment.status}
              </Badge>
            </div>
            <p className="text-xs text-[#6B6184] mt-2">Criado em {formatDate(order.createdAt)}</p>
          </div>

          <div className="flex gap-3">
            <Link href="/pacotes" className="flex-1">
              <Button variant="secondary" className="w-full">Novo pedido</Button>
            </Link>
            <a href="https://wa.me/55119999999999?text=Pedido%20" target="_blank" rel="noreferrer" className="flex-1">
              <Button variant="ghost" className="w-full">Suporte</Button>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
