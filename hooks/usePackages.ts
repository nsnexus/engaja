"use client";
import { useEffect, useState } from "react";
import { subscribePackages } from "@/lib/firebase/firestore";
import type { Package } from "@/types";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const unsub = subscribePackages(pkgs => {
      setPackages(pkgs);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { packages, loading };
}
