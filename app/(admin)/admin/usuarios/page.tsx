"use client";
import { useEffect, useState } from "react";
import { Users, Shield } from "lucide-react";
import { getUsers, upsertUser } from "@/lib/firebase/firestore";
import { Badge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { formatDate } from "@/lib/utils";
import type { AppUser } from "@/types";

export default function AdminUsuariosPage() {
  const [users,   setUsers]   = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() { const u = await getUsers(); setUsers(u); setLoading(false); }
  useEffect(() => { load(); }, []);

  async function toggleRole(user: AppUser) {
    const updated = { ...user, role: user.role === "admin" ? "customer" as const : "admin" as const };
    await upsertUser(updated); await load();
  }

  if (loading) return <PageSpinner />;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-800 text-[#F0EEFF] tracking-tight mb-1">Usuários</h1>
        <p className="text-sm text-[#6B6184]">{users.length} usuários cadastrados</p>
      </div>

      <div className="bg-[#161222] border border-[rgba(255,255,255,0.07)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                {["Usuário","E-mail","Role","Cadastro","Ação"].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-[11px] font-600 text-[#6B6184] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {users.map(user => (
                <tr key={user.uid} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-xs font-700 text-violet-300">
                        {user.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <p className="font-500 text-[#F0EEFF]">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#6B6184]">{user.email}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={user.role === "admin" ? "brand" : "muted"} dot>
                      {user.role === "admin" ? "Admin" : "Cliente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#6B6184] num">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <button
                      id={`toggle-role-${user.uid}`}
                      onClick={() => toggleRole(user)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-500 border border-[rgba(255,255,255,0.08)] text-[#A89FC8] hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-500/5 transition-all"
                    >
                      <Shield size={12} />
                      {user.role === "admin" ? "Revogar admin" : "Tornar admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-16 text-[#6B6184]">
              <Users size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum usuário ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
