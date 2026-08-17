import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] pt-16 pb-8 mt-12 bg-[#07060f]/80">
      <div className="wrap">
        <div className="foot grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="logo flex items-center gap-3 font-extrabold text-xl mono text-white select-none">
              <span className="logo-mark">⚡</span>
              <span>Engaja<span className="text-violet-400">Pro</span></span>
            </Link>
            <p className="text-[#9d99b5] text-sm max-w-[280px] mt-4 leading-relaxed">
              A plataforma que ajuda criadores e marcas a crescerem nas redes sociais com rapidez, segurança e resultado real.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Plataforma</h5>
            <div className="flex flex-col space-y-2.5">
              <Link href="#pacotes" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Pacotes</Link>
              <Link href="#como" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Como funciona</Link>
              <Link href="#vantagens" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Vantagens</Link>
              <Link href="/admin" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Painel Admin</Link>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Suporte</h5>
            <div className="flex flex-col space-y-2.5">
              <Link href="#faq" className="text-[#9d99b5] hover:text-white text-sm transition-colors">FAQ</Link>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="text-[#9d99b5] hover:text-white text-sm transition-colors">WhatsApp</a>
              <a href="mailto:contato@engajapro.com" className="text-[#9d99b5] hover:text-white text-sm transition-colors">E-mail</a>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h5>
            <div className="flex flex-col space-y-2.5">
              <Link href="#" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Termos de uso</Link>
              <Link href="#" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Privacidade</Link>
              <Link href="#" className="text-[#9d99b5] hover:text-white text-sm transition-colors">Reembolso</Link>
            </div>
          </div>
        </div>

        <div className="foot-btm border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#6f6b87]">
          <span>© 2026 EngajaPro. Feito com 💜 para criadores de conteúdo.</span>
          <div className="socials flex gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] grid place-items-center text-sm">📸</span>
            <span className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] grid place-items-center text-sm">🎵</span>
            <span className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] grid place-items-center text-sm">▶️</span>
            <span className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] grid place-items-center text-sm">💬</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
