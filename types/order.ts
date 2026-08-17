import type { Package } from "./package";

export type OrderStatus = "pendente" | "processando" | "concluido" | "cancelado";
export type PaymentMethod = "pix" | "cartao" | "boleto";
export type PaymentStatus = "aguardando" | "pago" | "falhou" | "reembolsado";

export interface OrderCustomer {
  name: string;
  email: string;
  contact?: string; // WhatsApp
}

export interface OrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  profile: string;           // @user ou URL
  packageId: string;
  packageSnapshot: Package;  // cópia no momento da compra
  price: number;
  payment: OrderPayment;
  status: OrderStatus;
  userId?: string | null;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderInput = Omit<Order, "id" | "createdAt" | "updatedAt">;
