"use client";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthChange, getUserRole } from "@/lib/firebase/auth";
import type { UserRole } from "@/types";

interface AuthState {
  user:    User | null;
  role:    UserRole | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

  useEffect(() => {
    const unsub = onAuthChange(async user => {
      if (!user) {
        setState({ user: null, role: null, loading: false });
        return;
      }
      const role = await getUserRole(user.uid);
      setState({ user, role, loading: false });
    });
    return () => unsub();
  }, []);

  return state;
}
