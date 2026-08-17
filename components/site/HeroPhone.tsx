"use client";
import React, { useState } from "react";
import Image from "next/image";

export function HeroPhone() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setRotate({ x, y });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-[580px] lg:min-h-[640px] perspective-[1600px] select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Ambient Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-pink-600/30 via-violet-600/35 to-cyan-500/25 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse" />

      {/* Main 3D Container with Parallax Tilt */}
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating Neon Card 1: Likes (Pink Glow) */}
        <div
          className="absolute -top-4 -left-12 sm:-left-16 z-20 animate-[floaty_4.2s_ease-in-out_infinite] pointer-events-none"
          style={{
            transform: "translateZ(60px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#140b1e]/85 backdrop-blur-xl border border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.45),inset_0_0_15px_rgba(244,63,94,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(244,63,94,0.6)]">
              ❤️
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono">+2.480</div>
              <div className="text-[11px] font-semibold text-rose-300/80">curtidas hoje</div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 2: Followers (Violet Glow) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-14 sm:-left-20 z-20 animate-[floaty_5s_ease-in-out_infinite_1s] pointer-events-none"
          style={{
            transform: "translateZ(75px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#120d24]/85 backdrop-blur-xl border border-violet-500/60 shadow-[0_0_35px_rgba(168,85,247,0.45),inset_0_0_15px_rgba(168,85,247,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(168,85,247,0.6)]">
              👥
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono">+1.240</div>
              <div className="text-[11px] font-semibold text-violet-300/80">novos seguidores</div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 3: Views (Cyan Glow) */}
        <div
          className="absolute bottom-16 -right-10 sm:-right-16 z-20 animate-[floaty_4.6s_ease-in-out_infinite_2s] pointer-events-none"
          style={{
            transform: "translateZ(85px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#091526]/85 backdrop-blur-xl border border-cyan-400/60 shadow-[0_0_35px_rgba(34,211,238,0.45),inset_0_0_15px_rgba(34,211,238,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm shadow-[0_0_15px_rgba(34,211,238,0.6)]">
              ▶
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono">+18.9k</div>
              <div className="text-[11px] font-semibold text-cyan-300/80">visualizações</div>
            </div>
          </div>
        </div>

        {/* High-Resolution 3D Phone Mockup Artwork */}
        <div className="relative w-[340px] sm:w-[410px] lg:w-[460px] h-[520px] sm:h-[580px] lg:h-[620px] drop-shadow-[0_40px_90px_rgba(0,0,0,0.85)]">
          <Image
            src="/images/hero-phone-3d.png"
            alt="Instagram 3D Growth Mockup"
            fill
            priority
            sizes="(max-width: 768px) 340px, (max-width: 1200px) 420px, 460px"
            className="object-contain filter contrast-105"
          />
        </div>
      </div>
    </div>
  );
}
