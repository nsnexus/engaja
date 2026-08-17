"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerWithEmail, loginWithGoogle } from "@/lib/firebase/auth";

export default function RegistroPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleRegister() {
    if (!name || !email || !password) { setError("Preencha todos os campos."); return; }
    if (password !== confirm) { setError("Senhas não coincidem."); return; }
    if (password.length < 6) { setError("Senha mínimo 6 caracteres."); return; }
    setLoading(true); setError("");
    try {
      await registerWithEmail(email, password, name);
      router.push("/pacotes");
    } catch {
      setError("Erro ao criar conta. E-mail já em uso?");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true); setError("");
    try {
      await loginWithGoogle();
      router.push("/pacotes");
    } catch {
      setError("Erro ao entrar com Google.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#0D0B14]">
      <div className="w-full max-w-sm animate-fade-in">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.5)]">
            <Zap size={18} className="text-white" />
          </span>
          <span className="text-lg font-700 gradient-text">EngajaPro</span>
        </Link>

        <div className="bg-[#161222] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
          <h1 className="text-xl font-700 text-[#F0EEFF] mb-1 text-center">Criar conta</h1>
          <p className="text-sm text-[#6B6184] text-center mb-8">Rápido e gratuito</p>

          <button
            id="register-google"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-10 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#1E1830] text-sm text-[#A89FC8] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all mb-5 disabled:opacity-40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-xs text-[#3D3558]">ou</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          <div className="space-y-4 mb-5">
            <Input id="reg-name" label="Nome completo" placeholder="João Silva" value={name} onChange={e => setName(e.target.value)} />
            <Input id="reg-email" label="E-mail" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input id="reg-password" label="Senha" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
            <Input id="reg-confirm" label="Confirmar senha" type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>

          {error && <p className="text-xs text-red-400 mb-4 text-center">{error}</p>}

          <Button id="register-submit" className="w-full" loading={loading} onClick={handleRegister}>
            Criar conta
          </Button>

          <p className="text-center text-xs text-[#6B6184] mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
