"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Package } from "lucide-react";
import { getPackages, createPackage, updatePackage, deletePackage } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { PageSpinner } from "@/components/ui/Spinner";
import { formatCurrency, formatNumber, NETWORK_ICONS } from "@/lib/utils";
import type { Package as Pkg, PackageInput, Network, ServiceType } from "@/types";

const NETWORK_OPTS  = ["Instagram","TikTok","YouTube","Twitter","Facebook"].map(n => ({ value: n, label: n }));
const SERVICE_OPTS  = ["Seguidores","Curtidas","Visualizações","Comentários","Compartilhamentos"].map(s => ({ value: s, label: s }));

const EMPTY: PackageInput = {
  network: "Instagram", service: "Seguidores",
  title: "", quantity: 1000, price: 29.9, delivery: "0-3h",
  popular: false, active: true,
};

export default function AdminPacotesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState<"create" | Pkg | null>(null);
  const [form,     setForm]     = useState<PackageInput>(EMPTY);
  const [saving,   setSaving]   = useState(false);

  async function load() {
    const pkgs = await getPackages(false);
    setPackages(pkgs); setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openCreate() { setForm(EMPTY); setModal("create"); }
  function openEdit(pkg: Pkg) { setForm({ ...pkg }); setModal(pkg); }
  function closeModal() { setModal(null); }

  async function handleSave() {
    setSaving(true);
    try {
      if (modal === "create") {
        await createPackage(form);
      } else if (modal && typeof modal === "object") {
        await updatePackage((modal as Pkg).id, form);
      }
      await load(); closeModal();
    } finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este pacote?")) return;
    await deletePackage(id); await load();
  }

  async function toggleActive(pkg: Pkg) {
    await updatePackage(pkg.id, { active: !pkg.active }); await load();
  }

  if (loading) return <PageSpinner />;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-800 text-[#F0EEFF] tracking-tight mb-1">Pacotes</h1>
          <p className="text-sm text-[#6B6184]">{packages.length} pacotes cadastrados</p>
        </div>
        <Button id="create-package-btn" onClick={openCreate} className="gap-2">
          <Plus size={15} /> Novo pacote
        </Button>
      </div>

      {/* Table */}
      <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                {["Pacote", "Rede", "Serviço", "Quantidade", "Preço", "Entrega", "Status", "Ações"].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-600 text-[#6B6184] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {packages.map(pkg => (
                <tr key={pkg.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{NETWORK_ICONS[pkg.network]}</span>
                      <div>
                        <p className="font-500 text-[#F0EEFF] leading-tight">{pkg.title}</p>
                        {pkg.popular && <span className="text-[10px] text-violet-400">🔥 Popular</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#A89FC8]">{pkg.network}</td>
                  <td className="px-4 py-3.5 text-[#A89FC8]">{pkg.service}</td>
                  <td className="px-4 py-3.5 font-600 text-[#F0EEFF] num">{formatNumber(pkg.quantity)}</td>
                  <td className="px-4 py-3.5 font-600 text-[#F0EEFF] num">{formatCurrency(pkg.price)}</td>
                  <td className="px-4 py-3.5 text-[#6B6184]">{pkg.delivery}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={pkg.active ? "completed" : "muted"} dot>
                      {pkg.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        id={`toggle-${pkg.id}`}
                        onClick={() => toggleActive(pkg)}
                        title={pkg.active ? "Desativar" : "Ativar"}
                        className="p-1.5 rounded-md text-[#6B6184] hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                      >
                        {pkg.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      </button>
                      <button
                        id={`edit-${pkg.id}`}
                        onClick={() => openEdit(pkg)}
                        className="p-1.5 rounded-md text-[#6B6184] hover:text-[#F0EEFF] hover:bg-[#241D38] transition-all"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        id={`delete-${pkg.id}`}
                        onClick={() => handleDelete(pkg.id)}
                        className="p-1.5 rounded-md text-[#6B6184] hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {packages.length === 0 && (
            <div className="text-center py-16 text-[#6B6184]">
              <Package size={28} className="mx-auto mb-3 opacity-30" />
              <p>Nenhum pacote. Crie o primeiro.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" id="package-modal-overlay">
          <div className="w-full max-w-md bg-[#161222] border border-[rgba(255,255,255,0.1)] rounded-2xl p-7 shadow-[0_24px_80px_rgba(0,0,0,0.7)] animate-scale-in">
            <h2 className="text-base font-700 text-[#F0EEFF] mb-6">
              {modal === "create" ? "Novo pacote" : "Editar pacote"}
            </h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <Select id="pkg-network" label="Rede" options={NETWORK_OPTS} value={form.network} onChange={e => setForm(f => ({ ...f, network: e.target.value as Network }))} />
                <Select id="pkg-service" label="Serviço" options={SERVICE_OPTS} value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value as ServiceType }))} />
              </div>
              <Input id="pkg-title" label="Título" placeholder="1.000 Seguidores" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              <div className="grid grid-cols-2 gap-4">
                <Input id="pkg-quantity" label="Quantidade" type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))} />
                <Input id="pkg-price" label="Preço (R$)" type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
              </div>
              <Input id="pkg-delivery" label="Prazo de entrega" placeholder="0-3h" value={form.delivery} onChange={e => setForm(f => ({ ...f, delivery: e.target.value }))} />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input id="pkg-popular" type="checkbox" className="accent-violet-500 w-4 h-4" checked={!!form.popular} onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))} />
                  <span className="text-sm text-[#A89FC8]">Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input id="pkg-active" type="checkbox" className="accent-violet-500 w-4 h-4" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                  <span className="text-sm text-[#A89FC8]">Ativo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={closeModal}>Cancelar</Button>
              <Button className="flex-1" loading={saving} onClick={handleSave} id="save-package-btn">Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
