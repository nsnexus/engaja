// store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Package } from "@/types";

interface CartStore {
  item:   Package | null;
  setItem: (pkg: Package | null) => void;
  clear:   () => void;
}

export const useCart = create<CartStore>()(
  persist(
    set => ({
      item:    null,
      setItem: pkg => set({ item: pkg }),
      clear:   () => set({ item: null }),
    }),
    { name: "engajapro-cart" }
  )
);
