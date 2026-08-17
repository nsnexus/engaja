export type Network = "Instagram" | "TikTok" | "YouTube" | "Twitter" | "Facebook";
export type ServiceType = "Seguidores" | "Curtidas" | "Visualizações" | "Comentários" | "Compartilhamentos";

export interface Package {
  id: string;
  network: Network;
  service: ServiceType;
  title: string;
  quantity: number;
  price: number;
  delivery: string;       // ex: "0-3h", "1-24h"
  icon?: string;
  popular?: boolean;
  active: boolean;
  smmServiceId?: number;  // ID do serviço na MachinesSMM API
  createdAt: Date;
  updatedAt: Date;
}

export type PackageInput = Omit<Package, "id" | "createdAt" | "updatedAt">;
