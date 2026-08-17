// lib/firebase/auth.ts
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "./config";
import type { AppUser, UserRole } from "@/types";

const provider = new GoogleAuthProvider();

// Mock user for development when Firebase is not yet configured in .env.local
const DEV_USER: User = {
  uid: "dev-admin",
  email: "admin@engajapro.com",
  displayName: "Admin Dev",
  emailVerified: true,
  isAnonymous: false,
  metadata: {} as any,
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => "mock-token",
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
  phoneNumber: null,
  photoURL: null,
  providerId: "firebase",
};

export async function loginWithEmail(email: string, password: string): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    return { ...DEV_USER, email, displayName: email.split("@")[0] };
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function registerWithEmail(email: string, password: string, name: string): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    return { ...DEV_USER, email, displayName: name };
  }
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDoc(result.user, name, "customer");
  return result.user;
}

export async function loginWithGoogle(): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    return DEV_USER;
  }
  const result = await signInWithPopup(auth, provider);
  await ensureUserDoc(result.user);
  return result.user;
}

export async function logout(): Promise<void> {
  if (!isFirebaseConfigured || !auth) {
    return;
  }
  await signOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void): Unsubscribe {
  if (!isFirebaseConfigured || !auth) {
    // In dev without Firebase, provide admin access so admin routes are testable
    cb(DEV_USER);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

export async function getUserRole(uid: string): Promise<UserRole> {
  if (!isFirebaseConfigured || !db) {
    return "admin";
  }
  try {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return "admin";
    return (snap.data().role as UserRole) ?? "admin";
  } catch {
    return "admin";
  }
}

async function createUserDoc(user: User, name: string, role: UserRole) {
  if (!isFirebaseConfigured || !db) return;
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email: user.email,
    role,
    photoURL: user.photoURL ?? "",
    createdAt: serverTimestamp(),
  }, { merge: true });
}

async function ensureUserDoc(user: User) {
  if (!isFirebaseConfigured || !db) return;
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) {
    await createUserDoc(user, user.displayName ?? "Usuário", "customer");
  }
}

export type { AppUser };
