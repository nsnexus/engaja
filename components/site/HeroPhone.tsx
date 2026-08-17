"use client";
import React from "react";
import Image from "next/image";

export function HeroPhone() {
  return (
    <div className="relative flex items-center justify-center min-h-[580px] lg:min-h-[640px] select-none py-6">
      {/* Background Tilted Elliptical Aura Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[680px] h-[260px] sm:h-[300px] -rotate-12 bg-gradient-to-r from-violet-600/30 via-pink-600/25 to-indigo-600/30 rounded-[100%] blur-[80px] pointer-events-none -z-10" />

      {/* Main 3D Composition Container */}
      <div className="relative flex items-center justify-center">
        {/* Floating Neon Card 1: Likes (Pink Glow) - Top Left */}
        <div className="absolute top-8 -left-10 sm:-left-24 z-20 animate-[floaty_4.5s_ease-in-out_infinite]">
          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#140c1e]/85 backdrop-blur-xl border border-rose-500/45 shadow-[0_0_40px_rgba(244,63,94,0.35),inset_0_0_15px_rgba(244,63,94,0.15)]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(244,63,94,0.7)] flex-shrink-0">
              ❤️
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                +2.480
              </div>
              <div className="text-xs font-semibold text-rose-300/90">
                curtidas hoje
              </div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 2: Followers (Violet Glow) - Bottom Left */}
        <div className="absolute bottom-20 -left-12 sm:-left-28 z-20 animate-[floaty_5.2s_ease-in-out_infinite_1s]">
          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#120e28]/85 backdrop-blur-xl border border-violet-500/45 shadow-[0_0_40px_rgba(168,85,247,0.35),inset_0_0_15px_rgba(168,85,247,0.15)]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(168,85,247,0.7)] flex-shrink-0">
              👥
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                +1.240
              </div>
              <div className="text-xs font-semibold text-violet-300/90">
                novos seguidores
              </div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 3: Views (Cyan Glow) - Bottom Right */}
        <div className="absolute bottom-24 -right-10 sm:-right-24 z-20 animate-[floaty_4.8s_ease-in-out_infinite_2s]">
          <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl sm:rounded-3xl bg-[#09152a]/85 backdrop-blur-xl border border-cyan-400/45 shadow-[0_0_40px_rgba(34,211,238,0.35),inset_0_0_15px_rgba(34,211,238,0.15)]">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center text-white text-base shadow-[0_0_20px_rgba(34,211,238,0.7)] flex-shrink-0">
              ▶
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                +18.9k
              </div>
              <div className="text-xs font-semibold text-cyan-300/90">
                visualizações
              </div>
            </div>
          </div>
        </div>

        {/* 3D Celular Image with Smooth Levitation */}
        <div className="relative w-[300px] sm:w-[360px] lg:w-[410px] h-[520px] sm:h-[580px] lg:h-[630px] animate-[phonefloat_6s_ease-in-out_infinite] filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
          <Image
            src="/images/celular-3d.png"
            alt="Celular 3D Instagram"
            fill
            priority
            sizes="(max-width: 768px) 300px, (max-width: 1200px) 360px, 410px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
