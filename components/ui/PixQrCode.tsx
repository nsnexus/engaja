"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Loader2 } from "lucide-react";

interface PixQrCodeProps {
  payload: string;
  size?: number;
  label?: string;
  className?: string;
}

export function PixQrCode({ payload, size = 200, label = "QR Code Pix", className = "" }: PixQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!payload) return;

    let active = true;
    setLoading(true);
    setError(false);

    QRCode.toDataURL(payload, {
      width: size * 2, // Dobro de resolução para telas Retina/High-DPI
      margin: 1,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
      .then((url) => {
        if (active) {
          setDataUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("[PixQrCode] Erro ao renderizar QR Code:", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [payload, size]);

  if (!payload) return null;

  if (loading) {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 ${className}`}
      >
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (error || !dataUrl) {
    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`flex items-center justify-center text-center p-4 text-xs text-[#B4ACD4] bg-white/5 rounded-2xl border border-white/10 ${className}`}
      >
        Não foi possível exibir o QR Code. Utilize o código copia e cola abaixo.
      </div>
    );
  }

  return (
    <div className={`p-3 bg-white rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.25)] border border-white/20 inline-block ${className}`}>
      <img
        src={dataUrl}
        alt={label}
        width={size}
        height={size}
        className="block rounded-lg mx-auto"
      />
    </div>
  );
}
