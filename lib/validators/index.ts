// lib/validators/index.ts
import { z } from "zod";

export const packageSchema = z.object({
  network:  z.enum(["Instagram", "TikTok", "YouTube", "Twitter", "Facebook"]),
  service:  z.enum(["Seguidores", "Curtidas", "Visualizações", "Comentários", "Compartilhamentos"]),
  title:    z.string().min(3).max(80),
  quantity: z.number().int().positive(),
  price:    z.number().positive(),
  delivery: z.string().min(1),
  icon:     z.string().optional(),
  popular:  z.boolean().optional().default(false),
  active:   z.boolean().default(true),
});

export const orderSchema = z.object({
  customer: z.object({
    name:    z.string().min(2),
    email:   z.string().email(),
    contact: z.string().optional(),
  }),
  profile:   z.string().min(1, "Informe o @ ou link do perfil"),
  packageId: z.string().min(1),
  payment: z.object({
    method: z.enum(["pix", "cartao", "boleto"]),
  }),
});

export const loginSchema = z.object({
  email:    z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = loginSchema.extend({
  name:            z.string().min(2, "Nome muito curto"),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export const settingsSchema = z.object({
  brand:     z.string().min(2),
  whatsapp:  z.string().min(10),
  email:     z.string().email(),
  maintenanceMode: z.boolean().default(false),
});

export type PackageFormData  = z.infer<typeof packageSchema>;
export type OrderFormData    = z.infer<typeof orderSchema>;
export type LoginFormData    = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
