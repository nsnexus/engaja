"use client";
import React from "react";
import Image from "next/image";
import { Heart, Users, Play } from "lucide-react";

export function HeroPhone() {
  return (
    <div className="relative flex items-center justify-center min-h-[580px] lg:min-h-[650px] select-none py-6">
      {/* Background Tilted Elliptical Aura Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[700px] h-[270px] sm:h-[320px] -rotate-12 bg-gradient-to-r from-violet-600/30 via-pink-600/25 to-indigo-600/30 rounded-[100%] blur-[90px] pointer-events-none -z-10" />

      {/* Main 3D Composition Container */}
      <div className="relative flex items-center justify-center">
        {/* Floating Neon Card 1: Likes (Rotating Pink/Rose Laser Beam) - Top Left */}
        <div
          className="absolute top-6 -left-12 sm:-left-28 z-30 animate-[floaty_4.5s_ease-in-out_infinite]"
          style={{
            "--beam-color": "#f43f5e",
            "--glow-color": "rgba(244, 63, 94, 0.5)",
          } as React.CSSProperties}
        >
          <div className="neon-border-card">
            <div className="neon-inner">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.8)] flex-shrink-0">
                <Heart size={20} className="fill-white text-white" />
              </div>
              <div className="pr-1">
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                  +2.480
                </div>
                <div className="text-xs font-semibold text-rose-200/90 whitespace-nowrap">
                  curtidas hoje
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 2: Followers (Rotating Violet/Purple Laser Beam) - Bottom Left */}
        <div
          className="absolute bottom-16 -left-14 sm:-left-32 z-30 animate-[floaty_5.2s_ease-in-out_infinite_1s]"
          style={{
            "--beam-color": "#a855f7",
            "--glow-color": "rgba(168, 85, 247, 0.5)",
          } as React.CSSProperties}
        >
          <div className="neon-border-card">
            <div className="neon-inner">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.8)] flex-shrink-0">
                <Users size={20} className="fill-white text-white" />
              </div>
              <div className="pr-1">
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                  +1.240
                </div>
                <div className="text-xs font-semibold text-violet-200/90 whitespace-nowrap">
                  novos seguidores
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 3: Views (Rotating Cyan/Blue Laser Beam) - Mid-Right */}
        <div
          className="absolute bottom-40 -right-12 sm:-right-28 z-30 animate-[floaty_4.8s_ease-in-out_infinite_2s]"
          style={{
            "--beam-color": "#22d3ee",
            "--glow-color": "rgba(34, 211, 238, 0.5)",
          } as React.CSSProperties}
        >
          <div className="neon-border-card">
            <div className="neon-inner">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.8)] flex-shrink-0">
                <Play size={18} className="fill-white text-white ml-0.5" />
              </div>
              <div className="pr-1">
                <div className="text-base sm:text-lg font-extrabold text-white tracking-tight mono leading-none mb-1">
                  +18.9k
                </div>
                <div className="text-xs font-semibold text-cyan-200/90 whitespace-nowrap">
                  visualizações
                </div>
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
