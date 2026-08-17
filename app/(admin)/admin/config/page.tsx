"use client";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { getSettings, updateSettings } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageSpinner } from "@/components/ui/Spinner";
import type { Settings as SettingsType } from "@/types";

const DEFAULT: SettingsType = {
  brand: "EngajaPro",
  whatsapp: "",
  email: "",
  maintenanceMode: false,
};

export default function AdminConfigPage() {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);

  useEffect(() => {
    getSettings().then(s => { if (s) setSettings(s); setLoading(false); });
  }, []);

  async function handleSave() {
    setSaving(true); setSaved(false);
    await updateSettings(settings);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <PageSpinner />;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[#F0EEFF] tracking-tight mb-1">Configurações</h1>
        <p className="text-sm text-[#6B6184]">Configurações gerais da plataforma</p>
      </div>

      <div className="space-y-5">
        {/* General */}
        <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={15} className="text-[#6B6184]" />
            <h2 className="text-sm font-600 text-[#F0EEFF]">Informações gerais</h2>
          </div>
          <div className="space-y-4">
            <Input id="config-brand" label="Nome da marca" value={settings.brand} onChange={e => setSettings(s => ({ ...s, brand: e.target.value }))} />
            <Input id="config-email" label="E-mail de suporte" type="email" value={settings.email} onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} />
            <Input id="config-whatsapp" label="WhatsApp (com DDI)" placeholder="+55119999999999" value={settings.whatsapp} onChange={e => setSettings(s => ({ ...s, whatsapp: e.target.value }))} />
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-600 text-[#F0EEFF] mb-1">Modo de manutenção</p>
              <p className="text-xs text-[#6B6184]">Exibe aviso no site público e bloqueia novas compras</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" id="maintenance-toggle">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.maintenanceMode}
                onChange={e => setSettings(s => ({ ...s, maintenanceMode: e.target.checked }))}
              />
              <div className="w-10 h-5 bg-[#241D38] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all border border-[rgba(255,255,255,0.1)]" />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button id="save-config-btn" loading={saving} onClick={handleSave}>Salvar configurações</Button>
          {saved && <span className="text-xs text-green-400 animate-fade-in">✓ Salvo com sucesso</span>}
        </div>
      </div>
    </div>
  );
}
