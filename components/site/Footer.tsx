import Link from "next/link";
import { Zap, Camera, Music2, PlayCircle, MessageCircle, Shield, Clock, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[#0D0B14] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-sm mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </span>
              <span className="gradient-text">EngajaPro</span>
            </Link>
            <p className="text-xs text-[#6B6184] leading-relaxed max-w-[200px]">
              Engajamento real para crescer nas redes sociais. Entrega segura e rápida.
            </p>
            <div className="flex gap-3 mt-4">
              {[Camera, Music2, PlayCircle, MessageCircle].map((Icon, i) => (
                <span key={i} className="w-8 h-8 rounded-md bg-[#1E1830] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[#6B6184] hover:text-violet-400 hover:border-violet-500/30 transition-colors cursor-pointer">
                  <Icon size={14} />
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-2xs font-600 text-[#6B6184] uppercase tracking-widest mb-4">Produtos</p>
            <ul className="flex flex-col gap-2.5">
              {["Instagram", "TikTok", "YouTube", "Twitter"].map(n => (
                <li key={n}>
                  <Link href="/pacotes" className="text-sm text-[#A89FC8] hover:text-white transition-colors">{n}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-2xs font-600 text-[#6B6184] uppercase tracking-widest mb-4">Suporte</p>
            <ul className="flex flex-col gap-2.5">
              {[["FAQ", "/faq"], ["Meu Pedido", "/pedido"], ["Contato", "mailto:suporte@engajapro.com.br"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#A89FC8] hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div>
            <p className="text-2xs font-600 text-[#6B6184] uppercase tracking-widest mb-4">Garantias</p>
            <ul className="flex flex-col gap-3">
              {[
                [Shield, "Pagamento seguro"],
                [Clock,  "Entrega em minutos"],
                [Sparkles, "Suporte 24/7"],
              ].map(([Icon, label]) => (
                <li key={label as string} className="flex items-center gap-2 text-sm text-[#A89FC8]">
                  <span className="text-violet-400"><Icon size={14} /></span>
                  {label as string}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3D3558]">© {new Date().getFullYear()} EngajaPro. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            {[["Privacidade", "#"], ["Termos", "#"]].map(([label, href]) => (
              <Link key={label} href={href} className="text-xs text-[#3D3558] hover:text-[#6B6184] transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
