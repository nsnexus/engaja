import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "EngajaPro — Engajamento Real para Redes Sociais",
    template: "%s | EngajaPro",
  },
  description:
    "Compre seguidores, curtidas e visualizações reais para Instagram, TikTok e YouTube. Entrega rápida, segura e com garantia.",
  keywords: ["seguidores", "curtidas", "engajamento", "instagram", "tiktok", "youtube"],
  metadataBase: new URL("https://engajapro.com.br"),
  openGraph: {
    type:        "website",
    locale:      "pt_BR",
    siteName:    "EngajaPro",
    title:       "EngajaPro — Engajamento Real para Redes Sociais",
    description: "Compre seguidores, curtidas e visualizações reais. Entrega em minutos.",
  },
  twitter: {
    card:  "summary_large_image",
    title: "EngajaPro",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor:   "#0D0B14",
  colorScheme:  "dark",
  initialScale: 1,
  width:        "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="bg-[#0D0B14] text-[#F0EEFF] antialiased">
        {children}
      </body>
    </html>
  );
}
