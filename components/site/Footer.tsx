import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ShieldCheck, Zap, Lock, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07060f] pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="wrap">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-14 mb-14 border-b border-white/[0.06]">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 flex-shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Início Imediato</p>
              <p className="text-[11px] text-[#9d99b5]">Entrega em minutos</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Garantia de 30 Dias</p>
              <p className="text-[11px] text-[#9d99b5]">Reposição automática</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Seguro</p>
              <p className="text-[11px] text-[#9d99b5]">Nunca pedimos senha</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 flex-shrink-0">
              <Headphones size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Suporte Humanizado</p>
              <p className="text-[11px] text-[#9d99b5]">Atendimento via Whats</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="logo flex items-center gap-3 font-extrabold text-2xl mono text-white select-none">
              <span className="logo-mark">⚡</span>
              <span>Engaja<span className="text-violet-400">Pro</span></span>
            </Link>
            <p className="text-[#9d99b5] text-sm max-w-[340px] leading-relaxed">
              A plataforma líder de crescimento inteligente para redes sociais. Impulsione seu alcance, autoridade e engajamento com velocidade e total segurança.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sistemas 100% Operacionais</span>
              </div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-violet-300">
              Plataforma
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#pacotes" className="text-[#9d99b5] hover:text-white transition-colors">
                  Todos os Pacotes
                </Link>
              </li>
              <li>
                <Link href="#como" className="text-[#9d99b5] hover:text-white transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#vantagens" className="text-[#9d99b5] hover:text-white transition-colors">
                  Vantagens & Garantias
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#9d99b5] hover:text-white transition-colors">
                  Painel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-violet-300">
              Suporte & Ajuda
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#faq" className="text-[#9d99b5] hover:text-white transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9d99b5] hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Suporte</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">24/7</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@engajapro.com" className="text-[#9d99b5] hover:text-white transition-colors">
                  contato@engajapro.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-violet-300">
              Redes Atendidas
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Instagram", "TikTok", "YouTube", "Facebook", "Twitter", "Kwai"].map(net => (
                <Link
                  key={net}
                  href="#pacotes"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-semibold text-[#B4ACD4] hover:text-white transition-all"
                >
                  <SocialIcon network={net} size={14} />
                  <span>{net}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#756B96]">
          <p>© 2026 EngajaPro. Todos os direitos reservados. CNPJ sob consulta.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Reembolso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
