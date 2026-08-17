// lib/firebase/firestore.ts
// Resilient CRUD helpers for packages, orders, users, settings with localStorage fallback
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc,
  deleteDoc, query, where, orderBy, serverTimestamp,
  onSnapshot, type Unsubscribe, type QueryConstraint,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import type { Package, PackageInput, Order, OrderInput, AppUser, Settings } from "@/types";

// ─── Converters ────────────────────────────────────────────
function toDate(v: unknown): Date {
  if (!v) return new Date();
  if (v instanceof Date) return v;
  if (typeof v === "object" && "toDate" in (v as object)) return (v as { toDate(): Date }).toDate();
  return new Date(v as string);
}

// ─── LocalStorage Helpers (for Dev / Offline) ──────────────
function getLocal<T>(key: string, defaultVal: T): T {
  if (typeof window === "undefined") return defaultVal;
  try {
    const raw = localStorage.getItem(`engajapro_${key}`);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocal<T>(key: string, val: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`engajapro_${key}`, JSON.stringify(val));
  } catch {}
}

const SEED_PACKAGES: Package[] = [
  {
    id: "seed-1",
    network: "Instagram",
    service: "Seguidores",
    title: "1.000 Seguidores Brasileiros",
    quantity: 1000,
    price: 29.90,
    delivery: "0-3h",
    popular: true,
    active: true,
    smmServiceId: 5008,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "seed-2",
    network: "Instagram",
    service: "Curtidas",
    title: "500 Curtidas Rápidas",
    quantity: 500,
    price: 14.90,
    delivery: "0-1h",
    popular: false,
    active: true,
    smmServiceId: 5002,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "seed-3",
    network: "TikTok",
    service: "Visualizações",
    title: "10.000 Visualizações TikTok",
    quantity: 10000,
    price: 19.90,
    delivery: "0-1h",
    popular: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// ─── Packages ──────────────────────────────────────────────
const PKG = "packages";

export async function getPackages(activeOnly = true): Promise<Package[]> {
  if (!isFirebaseConfigured || !db) {
    const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
    return activeOnly ? list.filter(p => p.active) : list;
  }
  try {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (activeOnly) constraints.unshift(where("active", "==", true));
    const snap = await getDocs(query(collection(db, PKG), ...constraints));
    return snap.docs.map(d => ({ id: d.id, ...d.data(), createdAt: toDate(d.data().createdAt), updatedAt: toDate(d.data().updatedAt) } as Package));
  } catch {
    const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
    return activeOnly ? list.filter(p => p.active) : list;
  }
}

export async function getPackageById(id: string): Promise<Package | null> {
  if (!isFirebaseConfigured || !db) {
    const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
    return list.find(p => p.id === id) ?? null;
  }
  try {
    const snap = await getDoc(doc(db, PKG, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data(), createdAt: toDate(snap.data()!.createdAt), updatedAt: toDate(snap.data()!.updatedAt) } as Package;
  } catch {
    const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
    return list.find(p => p.id === id) ?? null;
  }
}

export async function createPackage(data: PackageInput): Promise<string> {
  const newPkg: Package = {
    ...data,
    id: `pkg-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
  setLocal(PKG, [newPkg, ...list]);

  if (isFirebaseConfigured && db) {
    try {
      const ref = await addDoc(collection(db, PKG), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      return ref.id;
    } catch {}
  }
  return newPkg.id;
}

export async function updatePackage(id: string, data: Partial<PackageInput>): Promise<void> {
  const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
  setLocal(PKG, list.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date() } : p));

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, PKG, id), { ...data, updatedAt: serverTimestamp() });
    } catch {}
  }
}

export async function deletePackage(id: string): Promise<void> {
  const list = getLocal<Package[]>(PKG, SEED_PACKAGES);
  setLocal(PKG, list.filter(p => p.id !== id));

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, PKG, id));
    } catch {}
  }
}

export function subscribePackages(cb: (pkgs: Package[]) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb(getLocal<Package[]>(PKG, SEED_PACKAGES).filter(p => p.active));
    return () => {};
  }
  try {
    return onSnapshot(
      query(collection(db, PKG), where("active", "==", true), orderBy("createdAt", "desc")),
      snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data(), createdAt: toDate(d.data().createdAt), updatedAt: toDate(d.data().updatedAt) } as Package)))
    );
  } catch {
    cb(getLocal<Package[]>(PKG, SEED_PACKAGES).filter(p => p.active));
    return () => {};
  }
}

// ─── Orders ────────────────────────────────────────────────
const ORD = "orders";

export async function getOrders(): Promise<Order[]> {
  if (!isFirebaseConfigured || !db) {
    return getLocal<Order[]>(ORD, []);
  }
  try {
    const snap = await getDocs(query(collection(db, ORD), orderBy("createdAt", "desc")));
    return snap.docs.map(d => ({ id: d.id, ...d.data(), createdAt: toDate(d.data().createdAt), updatedAt: toDate(d.data().updatedAt) } as Order));
  } catch {
    return getLocal<Order[]>(ORD, []);
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (!isFirebaseConfigured || !db) {
    const list = getLocal<Order[]>(ORD, []);
    return list.find(o => o.id === id) ?? null;
  }
  try {
    const snap = await getDoc(doc(db, ORD, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data(), createdAt: toDate(snap.data()!.createdAt), updatedAt: toDate(snap.data()!.updatedAt) } as Order;
  } catch {
    const list = getLocal<Order[]>(ORD, []);
    return list.find(o => o.id === id) ?? null;
  }
}

export async function createOrder(data: OrderInput): Promise<string> {
  const newOrder: Order = {
    ...data,
    id: `ord-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const list = getLocal<Order[]>(ORD, []);
  setLocal(ORD, [newOrder, ...list]);

  if (isFirebaseConfigured && db) {
    try {
      const ref = await addDoc(collection(db, ORD), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      return ref.id;
    } catch {}
  }
  return newOrder.id;
}

export async function updateOrderStatus(id: string, status: Order["status"], notes?: string): Promise<void> {
  const list = getLocal<Order[]>(ORD, []);
  setLocal(ORD, list.map(o => o.id === id ? { ...o, status, ...(notes ? { notes } : {}), updatedAt: new Date() } : o));

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, ORD, id), { status, ...(notes ? { notes } : {}), updatedAt: serverTimestamp() });
    } catch {}
  }
}

export function subscribeOrder(id: string, cb: (order: Order | null) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    const list = getLocal<Order[]>(ORD, []);
    cb(list.find(o => o.id === id) ?? null);
    return () => {};
  }
  try {
    return onSnapshot(doc(db, ORD, id), snap => {
      if (!snap.exists()) { cb(null); return; }
      cb({ id: snap.id, ...snap.data(), createdAt: toDate(snap.data()!.createdAt), updatedAt: toDate(snap.data()!.updatedAt) } as Order);
    });
  } catch {
    const list = getLocal<Order[]>(ORD, []);
    cb(list.find(o => o.id === id) ?? null);
    return () => {};
  }
}

// ─── Users ─────────────────────────────────────────────────
const USR = "users";

export async function getUsers(): Promise<AppUser[]> {
  if (!isFirebaseConfigured || !db) {
    return getLocal<AppUser[]>(USR, [
      { uid: "dev-admin", name: "Administrador", email: "admin@engajapro.com", role: "admin", createdAt: new Date() }
    ]);
  }
  try {
    const snap = await getDocs(query(collection(db, USR), orderBy("createdAt", "desc")));
    return snap.docs.map(d => ({ uid: d.id, ...d.data(), createdAt: toDate(d.data().createdAt) } as AppUser));
  } catch {
    return getLocal<AppUser[]>(USR, []);
  }
}

export async function upsertUser(user: AppUser): Promise<void> {
  const list = getLocal<AppUser[]>(USR, []);
  const idx = list.findIndex(u => u.uid === user.uid);
  if (idx >= 0) {
    list[idx] = user;
  } else {
    list.push(user);
  }
  setLocal(USR, list);

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, USR, user.uid), { ...user, updatedAt: serverTimestamp() });
    } catch {}
  }
}

// ─── Settings ──────────────────────────────────────────────
export async function getSettings(): Promise<Settings | null> {
  if (!isFirebaseConfigured || !db) {
    return getLocal<Settings>("settings", {
      brand: "EngajaPro",
      whatsapp: "+5511999999999",
      email: "contato@engajapro.com",
      maintenanceMode: false,
    });
  }
  try {
    const snap = await getDoc(doc(db, "settings", "general"));
    if (!snap.exists()) return null;
    return snap.data() as Settings;
  } catch {
    return getLocal<Settings | null>("settings", null);
  }
}

export async function updateSettings(data: Partial<Settings>): Promise<void> {
  const current = getLocal<Settings>("settings", {
    brand: "EngajaPro",
    whatsapp: "",
    email: "",
    maintenanceMode: false,
  });
  setLocal("settings", { ...current, ...data });

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, "settings", "general"), { ...data, updatedAt: serverTimestamp() });
    } catch {}
  }
}
