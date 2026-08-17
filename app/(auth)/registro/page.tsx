"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerWithEmail } from "@/lib/firebase/auth";

export default function RegistroPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleRegister(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!name || !email || !password) { setError("Preencha todos os campos."); return; }
    if (password !== confirm) { setError("As senhas não coincidem."); return; }
    if (password.length < 6) { setError("A senha deve ter no mínimo 6 caracteres."); return; }
    setLoading(true); setError("");
    try {
      await registerWithEmail(email, password, name);
      router.push("/pacotes");
    } catch {
      setError("Erro ao criar conta. O e-mail já pode estar em uso.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#09070F] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-all">
            <Zap size={20} className="text-white fill-white" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Engaja<span className="text-violet-400">Pro</span>
          </span>
        </Link>

        <div className="glass-card rounded-3xl p-8 border-[rgba(255,255,255,0.08)] shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-xl font-extrabold text-white mb-1">Criar Conta</h1>
            <p className="text-xs text-[#B4ACD4]">Rápido e 100% gratuito</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 mb-6">
            <Input
              id="reg-name"
              label="Nome completo"
              placeholder="Seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Input
              id="reg-email"
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              id="reg-password"
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Input
              id="reg-confirm"
              label="Confirmar senha"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            <Button
              id="register-submit"
              type="submit"
              className="w-full h-12 text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              loading={loading}
            >
              Criar Conta
              <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </form>

          <p className="text-center text-xs text-[#756B96]">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 font-bold transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
