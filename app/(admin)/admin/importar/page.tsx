"use client";
import { useEffect, useState, useMemo } from "react";
import { Search, Plus, RefreshCw, ExternalLink, Info, CheckCircle2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { createPackage } from "@/lib/firebase/firestore";
import { cn, formatCurrency } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────
interface SMMService {
  service:  number;
  name:     string;
  type:     string;
  category: string;
  rate:     string;  // Valor em R$ por 1.000 na MachinesSMM
  min:      string;
  max:      string;
  refill:   boolean;
  cancel:   boolean;
  description?: string;
}

// ─── Helpers ────────────────────────────────────────────────
function calcCostBRL(rateStr: string, quantity: number): number {
  const rate = parseFloat(rateStr) || 0;
  return (rate / 1000) * quantity;
}

function detectNetwork(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("instagram"))   return "Instagram";
  if (cat.includes("tiktok"))      return "TikTok";
  if (cat.includes("youtube"))     return "YouTube";
  if (cat.includes("twitter") || cat.includes("x -")) return "Twitter";
  if (cat.includes("facebook"))    return "Facebook";
  if (cat.includes("telegram"))    return "Telegram";
  if (cat.includes("whatsapp"))    return "WhatsApp";
  if (cat.includes("kwai"))        return "Kwai";
  if (cat.includes("twitch"))      return "Twitch";
  return "Outros";
}

function detectService(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("seguidor") || n.includes("follower")) return "Seguidores";
  if (n.includes("curtida") || n.includes("like"))      return "Curtidas";
  if (n.includes("visuali") || n.includes("view"))      return "Visualizações";
  if (n.includes("comentar") || n.includes("comment"))  return "Comentários";
  if (n.includes("compartil") || n.includes("share"))   return "Compartilhamentos";
  return "Seguidores";
}

const NETWORK_ICONS: Record<string, string> = {
  Instagram: "📸", TikTok: "🎵", YouTube: "▶️", Twitter: "🐦",
  Facebook: "📘", Telegram: "✈️", WhatsApp: "💬", Kwai: "🎬",
  Twitch: "🎮", Outros: "➕",
};

// ─── Markup sugerido por padrão: 3x (300% sobre o custo) ────
const DEFAULT_MARKUP = 3.0;

// ─── Component ──────────────────────────────────────────────
export default function ImportarServicosPage() {
  const [services,   setServices]   = useState<SMMService[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [search,     setSearch]     = useState("");
  const [network,    setNetwork]    = useState("Tudo");
  const [category,   setCategory]   = useState("");
  const [selected,   setSelected]   = useState<SMMService | null>(null);
  const [markup,     setMarkup]     = useState(DEFAULT_MARKUP);
  const [quantity,   setQuantity]   = useState(1000);
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);

  async function fetchServices() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/smm/services");
      if (!res.ok) throw new Error(await res.text());
      const data: SMMService[] = await res.json();
      setServices(data);
      if (data.length > 0) setCategory(data[0].category);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchServices(); }, []);

  // ─── Derived data ───────────────────────────────────────
  const networks = useMemo(() => {
    const set = new Set(services.map(s => detectNetwork(s.category)));
    return ["Tudo", ...Array.from(set).sort()];
  }, [services]);

  const filteredByNetwork = useMemo(() =>
    services.filter(s =>
      network === "Tudo" || detectNetwork(s.category) === network
    ),
    [services, network]
  );

  const categories = useMemo(() => {
    const set = new Set(filteredByNetwork.map(s => s.category));
    return Array.from(set).sort();
  }, [filteredByNetwork]);

  // Reset category when network tab changes
  useEffect(() => {
    if (categories.length > 0) setCategory(categories[0]);
  }, [categories]);

  const servicesInCategory = useMemo(() =>
    filteredByNetwork.filter(s => s.category === category &&
      (search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || String(s.service).includes(search))
    ),
    [filteredByNetwork, category, search]
  );

  // Auto-select first service when category changes
  useEffect(() => {
    setSelected(servicesInCategory[0] ?? null);
  }, [category]);

  // ─── Preço final (Custo direto em BRL da API) ─────────────
  const costBRL  = selected ? calcCostBRL(selected.rate, quantity) : 0;
  const saleBRL  = costBRL * markup;
  const minQty   = selected ? parseInt(selected.min) || 10 : 10;
  const maxQty   = selected ? parseInt(selected.max) || 100000 : 100000;

  // ─── Criar pacote ────────────────────────────────────────
  async function handleCreatePackage() {
    if (!selected) return;
    setSaving(true); setSaved(false);
    await createPackage({
      network:      detectNetwork(selected.category) as never,
      service:      detectService(selected.name) as never,
      title:        `${quantity.toLocaleString("pt-BR")} ${detectService(selected.name)}`,
      quantity,
      price:        Math.ceil(saleBRL * 100) / 100,
      delivery:     "0-24h",
      popular:      false,
      active:       true,
      smmServiceId: selected.service,
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Importar Serviços da API</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
              <CheckCircle2 size={13} />
              <span>Valores em Real (R$)</span>
            </div>
          </div>
          <p className="text-sm text-[#B4ACD4] mt-1">
            {services.length > 0
              ? `${services.length} serviços carregados em tempo real da MachinesSMM`
              : "Conectando à API…"}
          </p>
        </div>
        <Button variant="secondary" onClick={fetchServices} disabled={loading} className="gap-2 self-start sm:self-auto">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Atualizar Catálogo
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4 text-sm text-red-400 mb-6 flex items-start gap-3">
          <Info size={18} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold mb-1">Erro ao conectar à API</p>
            <p className="text-xs opacity-90">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center h-72 gap-4">
          <Spinner size="lg" />
          <p className="text-sm font-medium text-[#B4ACD4]">Carregando catálogo de serviços em Reais (R$)…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-6">

          {/* ─── Left: Seletor de Rede e Serviço ─── */}
          <div className="space-y-4">

            {/* Network tabs */}
            <div className="flex flex-wrap gap-2">
              {networks.map(net => (
                <button
                  key={net}
                  id={`net-${net.toLowerCase()}`}
                  onClick={() => setNetwork(net)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                    network === net
                      ? "bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                      : "bg-[#130F20] text-[#B4ACD4] border-[rgba(255,255,255,0.08)] hover:border-violet-500/30 hover:text-white"
                  )}
                >
                  <span className="text-base">{NETWORK_ICONS[net] ?? "🌐"}</span>
                  {net}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756B96]" />
              <input
                id="smm-search"
                type="text"
                placeholder="Buscar serviço por nome ou ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#130F20] border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-[#756B96] focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Category select */}
            <div>
              <label className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider mb-2 block">
                Categoria
              </label>
              <div className="relative">
                <select
                  id="smm-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl bg-[#130F20] border border-[rgba(255,255,255,0.08)] text-sm text-white appearance-none focus:outline-none focus:border-violet-500 cursor-pointer transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#756B96]">▾</div>
              </div>
            </div>

            {/* Service select */}
            <div>
              <label className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider mb-2 block">
                Serviço <span className="text-[#756B96] font-normal normal-case">({servicesInCategory.length} disponíveis nesta categoria)</span>
              </label>
              <div className="relative">
                <select
                  id="smm-service"
                  value={selected?.service ?? ""}
                  onChange={e => setSelected(servicesInCategory.find(s => s.service === Number(e.target.value)) ?? null)}
                  className="w-full h-12 px-4 rounded-xl bg-[#130F20] border border-[rgba(255,255,255,0.08)] text-sm text-white appearance-none focus:outline-none focus:border-violet-500 cursor-pointer transition-colors"
                >
                  {servicesInCategory.map(svc => (
                    <option key={svc.service} value={svc.service}>
                      [#{svc.service}] {svc.name} | Custo: R$ {parseFloat(svc.rate).toFixed(2)} por 1.000
                    </option>
                  ))}
                  {servicesInCategory.length === 0 && (
                    <option disabled>Nenhum serviço encontrado</option>
                  )}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#756B96]">▾</div>
              </div>
            </div>

            {/* Description card */}
            {selected && (
              <div className="glass-card rounded-2xl p-6 border-[rgba(255,255,255,0.08)] animate-fade-in">
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-violet-400" />
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Ficha Técnica do Fornecedor</p>
                  </div>
                  <a
                    href="https://machinesmm.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    MachinesSMM <ExternalLink size={12} />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-sm mb-5">
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-[rgba(255,255,255,0.04)]">
                    <p className="text-[11px] text-[#756B96] font-semibold mb-1">ID do Serviço</p>
                    <p className="font-extrabold text-violet-300 num text-base">#{selected.service}</p>
                  </div>
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-[rgba(255,255,255,0.04)]">
                    <p className="text-[11px] text-[#756B96] font-semibold mb-1">Tipo</p>
                    <p className="font-bold text-white truncate">{selected.type}</p>
                  </div>
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-emerald-500/20 bg-emerald-500/5">
                    <p className="text-[11px] text-emerald-400 font-bold mb-1">Custo Fornecedor (1.000 un.)</p>
                    <p className="font-extrabold text-emerald-400 num text-base">R$ {parseFloat(selected.rate).toFixed(2)}</p>
                  </div>
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-[rgba(255,255,255,0.04)]">
                    <p className="text-[11px] text-[#756B96] font-semibold mb-1">Quantidade Mínima</p>
                    <p className="font-bold text-white num">{Number(selected.min).toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-[rgba(255,255,255,0.04)]">
                    <p className="text-[11px] text-[#756B96] font-semibold mb-1">Quantidade Máxima</p>
                    <p className="font-bold text-white num">{Number(selected.max).toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="bg-[#09070F] rounded-xl p-3.5 border border-[rgba(255,255,255,0.04)]">
                    <p className="text-[11px] text-[#756B96] font-semibold mb-1">Custo Unitário</p>
                    <p className="font-bold text-[#B4ACD4] num">R$ {(parseFloat(selected.rate) / 1000).toFixed(4)}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-xs flex-wrap">
                  <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-semibold",
                    selected.refill
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : "text-[#756B96] bg-[#09070F] border-[rgba(255,255,255,0.06)]"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Reposição {selected.refill ? "Garantida" : "Não aplicável"}
                  </span>
                  <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-semibold",
                    selected.cancel
                      ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                      : "text-[#756B96] bg-[#09070F] border-[rgba(255,255,255,0.06)]"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    Cancelamento {selected.cancel ? "Permitido" : "Não permitido"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ─── Right: Calculadora & Publicação de Pacote ─── */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6 border-[rgba(255,255,255,0.08)] sticky top-8">
              <h2 className="text-base font-extrabold text-white mb-5 flex items-center gap-2">
                <Plus size={16} className="text-violet-400" />
                Criar Pacote de Venda
              </h2>

              {selected ? (
                <div className="space-y-5">
                  {/* Service preview */}
                  <div className="bg-[#09070F] border border-violet-500/30 rounded-xl p-4">
                    <p className="text-[10px] text-violet-400 font-bold uppercase tracking-wider mb-1">Serviço Selecionado</p>
                    <p className="text-xs font-bold text-white leading-snug">{selected.name}</p>
                    <p className="text-[11px] text-violet-300 mt-1 num font-semibold">ID #{selected.service}</p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider mb-2 block">
                      Quantidade do Pacote
                    </label>
                    <input
                      id="pkg-quantity-import"
                      type="number"
                      min={minQty}
                      max={maxQty}
                      step={100}
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] text-sm text-white focus:outline-none focus:border-violet-500 num font-bold"
                    />
                    <p className="text-[11px] text-[#756B96] mt-1.5">
                      Mín: {Number(selected.min).toLocaleString("pt-BR")} · Máx: {Number(selected.max).toLocaleString("pt-BR")}
                    </p>
                  </div>

                  {/* Markup */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#B4ACD4] uppercase tracking-wider block">
                        Margem de Lucro
                      </label>
                      <span className="text-xs font-extrabold text-violet-400 num">{markup}x (300% do custo)</span>
                    </div>
                    <div className="flex gap-2 mb-2.5">
                      {[2, 2.5, 3, 4, 5].map(m => (
                        <button
                          key={m}
                          onClick={() => setMarkup(m)}
                          className={cn(
                            "flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                            markup === m
                              ? "bg-violet-600 text-white border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                              : "bg-[#09070F] text-[#B4ACD4] border-[rgba(255,255,255,0.08)] hover:border-violet-500/30"
                          )}
                        >
                          {m === 3 ? "3x (300%)" : `${m}x`}
                        </button>
                      ))}
                    </div>
                    <input
                      id="pkg-markup"
                      type="number"
                      min={1.1}
                      max={20}
                      step={0.1}
                      value={markup}
                      onChange={e => setMarkup(Number(e.target.value))}
                      className="w-full h-10 px-3.5 rounded-xl bg-[#09070F] border border-[rgba(255,255,255,0.08)] text-sm text-white focus:outline-none focus:border-violet-500 num font-semibold"
                    />
                  </div>

                  {/* Price preview */}
                  <div className="bg-[#09070F] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4.5 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#756B96]">Custo na API ({quantity.toLocaleString("pt-BR")} un.)</span>
                      <span className="text-amber-400 num font-bold">
                        {formatCurrency(costBRL)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#756B96]">Multiplicador Aplicado</span>
                      <span className="text-[#B4ACD4] num font-bold">{markup}x</span>
                    </div>
                    <div className="h-px bg-[rgba(255,255,255,0.08)]" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white">Preço de Venda Final</span>
                      <span className="text-2xl font-extrabold text-emerald-400 num">{formatCurrency(saleBRL)}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1.5 border-t border-[rgba(255,255,255,0.04)]">
                      <span className="text-[#756B96]">Seu Lucro Líquido</span>
                      <span className="text-emerald-400 num font-extrabold">+{formatCurrency(saleBRL - costBRL)}</span>
                    </div>
                  </div>

                  <Button
                    id="create-package-from-api"
                    className="w-full h-12 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    loading={saving}
                    onClick={handleCreatePackage}
                  >
                    <Plus size={16} className="mr-1.5" />
                    Publicar Pacote na Loja
                  </Button>

                  {saved && (
                    <p className="text-xs text-center text-emerald-400 animate-fade-in font-bold">
                      ✓ Pacote publicado com sucesso em /pacotes!
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 text-[#756B96]">
                  <p className="text-3xl mb-2">👈</p>
                  <p className="text-xs font-semibold">Selecione um serviço à esquerda para calcular o preço e publicar.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
