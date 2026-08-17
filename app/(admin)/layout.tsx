"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Zap, ChevronRight, Download
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/firebase/auth";
import { PageSpinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin",          icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/importar", icon: Download,        label: "Importar Serviços" },
  { href: "/admin/pacotes",  icon: Package,          label: "Pacotes" },
  { href: "/admin/pedidos",  icon: ShoppingCart,     label: "Pedidos" },
  { href: "/admin/usuarios", icon: Users,            label: "Usuários" },
  { href: "/admin/config",   icon: Settings,         label: "Configurações" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.replace("/login");
    }
  }, [user, role, loading, router]);

  if (loading || !user || role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center bg-[#0D0B14]"><PageSpinner /></div>;
  }

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0D0B14]">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-[rgba(255,255,255,0.07)] bg-[#0D0B14]">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-[rgba(255,255,255,0.07)]">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.4)]">
            <Zap size={15} className="text-white" />
          </span>
          <span className="text-sm font-700 gradient-text">EngajaPro</span>
          <span className="ml-auto text-[10px] font-600 text-violet-400 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded-full">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5" role="navigation" aria-label="Admin navigation">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                id={`admin-nav-${item.label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all",
                  active
                    ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                    : "text-[#6B6184] hover:text-[#A89FC8] hover:bg-[#1E1830]"
                )}
              >
                <item.icon size={15} />
                {item.label}
                {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-[rgba(255,255,255,0.07)] p-3">
          <div className="flex items-center gap-3 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-xs font-700 text-violet-300">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-600 text-[#F0EEFF] truncate">{user.displayName ?? "Admin"}</p>
              <p className="text-[10px] text-[#6B6184] truncate">{user.email}</p>
            </div>
          </div>
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#6B6184] hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={13} />
            Sair
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
