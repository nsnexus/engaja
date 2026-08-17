// lib/firebase/config.ts
// Client-side Firebase initialization — resilient with dev fallback
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();

export const isFirebaseConfigured = Boolean(apiKey && projectId && apiKey.length > 5 && !apiKey.includes("placeholder"));

const firebaseConfig = {
  apiKey:            apiKey || "AIzaSyDummyKeyForLocalDevelopmentOnly_12345",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "engajapro.firebaseapp.com",
  projectId:         projectId || "engajapro-dev",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "engajapro-dev.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let storageInstance: FirebaseStorage | null = null;

if (typeof window !== "undefined") {
  try {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
    if (isFirebaseConfigured) {
      dbInstance = getFirestore(appInstance);
      authInstance = getAuth(appInstance);
      storageInstance = getStorage(appInstance);
    }
  } catch (e) {
    console.warn("[Firebase] Initialized in fallback mode:", e);
  }
}

export const app     = appInstance as unknown as FirebaseApp;
export const db      = dbInstance as unknown as Firestore;
export const auth    = authInstance as unknown as Auth;
export const storage = storageInstance as unknown as FirebaseStorage;
export default app;
