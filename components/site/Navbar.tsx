"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav sticky top-0 z-50 backdrop-blur-xl bg-[#07060f]/75 border-b border-white/[0.08] transition-all">
      <div className="wrap nav-in flex items-center justify-between h-[76px]">
        {/* Logo */}
        <Link href="/" className="logo flex items-center gap-3 font-extrabold text-xl mono text-white group select-none">
          <span className="logo-mark">⚡</span>
          <span>Engaja<span className="text-violet-400">Pro</span></span>
        </Link>

        {/* Desktop Nav Menu */}
        <div className="nav-menu hidden md:flex items-center gap-8">
          <Link href="#pacotes" className="text-[#9d99b5] hover:text-white font-medium text-sm transition-colors">
            Pacotes
          </Link>
          <Link href="#como" className="text-[#9d99b5] hover:text-white font-medium text-sm transition-colors">
            Como funciona
          </Link>
          <Link href="#vantagens" className="text-[#9d99b5] hover:text-white font-medium text-sm transition-colors">
            Vantagens
          </Link>
          <Link href="#faq" className="text-[#9d99b5] hover:text-white font-medium text-sm transition-colors">
            FAQ
          </Link>
          <Link href="/admin" className="text-[#6f6b87] hover:text-[#9d99b5] font-medium text-xs transition-colors">
            Painel Admin
          </Link>
          <Link href="#pacotes" className="btn btn-grad btn-sm">
            Começar agora
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden bg-transparent border-none text-white text-2xl cursor-pointer p-2"
          onClick={() => setOpen(!open)}
          aria-label="Abrir Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-[#0d0b1a] border-b border-white/[0.08] px-6 py-6 flex flex-col gap-4 animate-fade-in">
          <Link href="#pacotes" onClick={() => setOpen(false)} className="text-[#9d99b5] hover:text-white font-medium text-base py-2 border-b border-white/[0.04]">
            Pacotes
          </Link>
          <Link href="#como" onClick={() => setOpen(false)} className="text-[#9d99b5] hover:text-white font-medium text-base py-2 border-b border-white/[0.04]">
            Como funciona
          </Link>
          <Link href="#vantagens" onClick={() => setOpen(false)} className="text-[#9d99b5] hover:text-white font-medium text-base py-2 border-b border-white/[0.04]">
            Vantagens
          </Link>
          <Link href="#faq" onClick={() => setOpen(false)} className="text-[#9d99b5] hover:text-white font-medium text-base py-2 border-b border-white/[0.04]">
            FAQ
          </Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="text-violet-400 font-semibold text-sm py-2">
            Painel Admin
          </Link>
          <Link href="#pacotes" onClick={() => setOpen(false)} className="btn btn-grad text-center justify-center mt-2">
            Começar agora 🚀
          </Link>
        </div>
      )}
    </nav>
  );
}
