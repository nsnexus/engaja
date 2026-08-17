export type UserRole = "admin" | "customer";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
}

export interface Settings {
  brand: string;
  whatsapp: string;
  email: string;
  mercadoPagoPublicKey?: string;
  stripePublicKey?: string;
  maintenanceMode: boolean;
}
