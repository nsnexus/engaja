"use client";
import { useEffect, useState } from "react";
import { subscribeOrder } from "@/lib/firebase/firestore";
import type { Order } from "@/types";

export function useOrder(orderId: string | null) {
  const [order,   setOrder]   = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    const unsub = subscribeOrder(orderId, o => {
      setOrder(o);
      setLoading(false);
    });
    return () => unsub();
  }, [orderId]);

  return { order, loading };
}
