"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV = [
  { href: "/pacotes", label: "Pacotes & Serviços" },
  { href: "/admin",   label: "Painel Admin" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[rgba(255,255,255,0.07)] bg-[#09070F]/85 backdrop-blur-xl transition-all">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none group">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(139,92,246,0.8)] transition-all">
            <Zap size={20} className="text-white fill-white" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-violet-300 transition-colors">
              Engaja<span className="text-violet-400">Pro</span>
            </span>
            <span className="text-[10px] text-[#756B96] font-semibold tracking-wider uppercase -mt-1">
              Social Growth
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV.map(n => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="px-4 py-2 text-sm font-medium text-[#B4ACD4] hover:text-white rounded-xl hover:bg-[#1C1630]/70 transition-all"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/pacotes">
            <Button
              size="md"
              className="h-11 px-5 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              Comprar Agora
              <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2.5 rounded-xl text-[#B4ACD4] hover:text-white bg-[#130F20] border border-[rgba(255,255,255,0.08)]"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#09070F]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-3 animate-fade-in shadow-2xl">
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-semibold text-[#B4ACD4] hover:text-white border-b border-[rgba(255,255,255,0.05)]"
            >
              {n.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/pacotes" onClick={() => setOpen(false)}>
              <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                Ver Pacotes & Preços
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
