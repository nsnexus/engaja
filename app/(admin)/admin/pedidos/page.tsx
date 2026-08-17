"use client";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getOrders, updateOrderStatus } from "@/lib/firebase/firestore";
import { Badge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { formatCurrency, formatDate, STATUS_LABELS, NETWORK_ICONS } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const STATUS_OPTS: { value: OrderStatus; label: string }[] = [
  { value: "pendente",    label: "Pendente" },
  { value: "processando", label: "Processando" },
  { value: "concluido",   label: "Concluído" },
  { value: "cancelado",   label: "Cancelado" },
];

const STATUS_BADGE_MAP: Record<OrderStatus, "pending"|"processing"|"completed"|"cancelled"> = {
  pendente: "pending", processando: "processing", concluido: "completed", cancelado: "cancelled",
};

const FILTERS: { value: OrderStatus | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" }, ...STATUS_OPTS,
];

export default function AdminPedidosPage() {
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState<OrderStatus | "todos">("todos");
  const [updating, setUpdating] = useState<string | null>(null);

  async function load() {
    const o = await getOrders(); setOrders(o); setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function changeStatus(id: string, status: OrderStatus) {
    setUpdating(id);
    await updateOrderStatus(id, status);
    await load();
    setUpdating(null);
  }

  const filtered = filter === "todos" ? orders : orders.filter(o => o.status === filter);

  if (loading) return <PageSpinner />;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-[#F0EEFF] tracking-tight mb-1">Pedidos</h1>
          <p className="text-sm text-[#6B6184]">{orders.length} pedidos no total</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {FILTERS.map(f => (
          <button
            key={f.value}
            id={`filter-orders-${f.value}`}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-500 border transition-all",
              filter === f.value
                ? "bg-violet-600 text-white border-violet-500"
                : "text-[#A89FC8] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:text-white"
            )}
          >
            {f.label}
            <span className="ml-1.5 opacity-60 num">
              {f.value === "todos" ? orders.length : orders.filter(o => o.status === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                {["Pedido","Cliente","Pacote","Status","Pagamento","Total","Data","Ação"].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-600 text-[#6B6184] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-600 text-violet-400 num">#{order.id.slice(0,8).toUpperCase()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-500 text-[#F0EEFF]">{order.customer.name}</p>
                    <p className="text-xs text-[#6B6184]">{order.customer.email}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span>{NETWORK_ICONS[order.packageSnapshot.network]}</span>
                      <p className="text-[#A89FC8] truncate max-w-[140px]">{order.packageSnapshot.title}</p>
                    </div>
                    <p className="text-xs text-[#6B6184]">{order.profile}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={STATUS_BADGE_MAP[order.status]} dot>{STATUS_LABELS[order.status]}</Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={order.payment.status === "pago" ? "completed" : "pending"} dot>
                      {order.payment.status === "pago" ? "Pago" : "Pendente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 font-600 text-[#F0EEFF] num">{formatCurrency(order.price)}</td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6184] num whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={e => changeStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-[#0D0B14] border border-[rgba(255,255,255,0.08)] text-xs text-[#A89FC8] rounded-md px-2 py-1.5 focus:outline-none focus:border-violet-500 cursor-pointer disabled:opacity-40"
                    >
                      {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#6B6184]">
              <ShoppingCart size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum pedido neste filtro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
