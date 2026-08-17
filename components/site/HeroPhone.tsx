"use client";
import React from "react";

export function HeroPhone() {
  return (
    <div className="hero-visual relative flex items-center justify-center h-full min-h-[580px]">
      {/* Floating Chips */}
      <div className="chip chip-1">
        <div className="ci" style={{ background: "rgba(236, 72, 153, 0.15)" }}>❤️</div>
        <div>
          <strong className="text-white text-xs">+2.480</strong>
          <small className="text-[#9d99b5] text-[11px] block">curtidas hoje</small>
        </div>
      </div>

      <div className="chip chip-2">
        <div className="ci" style={{ background: "rgba(139, 92, 246, 0.15)" }}>👥</div>
        <div>
          <strong className="text-white text-xs">+1.240</strong>
          <small className="text-[#9d99b5] text-[11px] block">novos seguidores</small>
        </div>
      </div>

      <div className="chip chip-3">
        <div className="ci" style={{ background: "rgba(34, 211, 238, 0.15)" }}>▶️</div>
        <div>
          <strong className="text-white text-xs">+18.9k</strong>
          <small className="text-[#9d99b5] text-[11px] block">visualizações</small>
        </div>
      </div>

      {/* Phone Body */}
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen flex flex-col justify-between">
          <div>
            <div className="ps-top flex items-center gap-3 my-4">
              <div className="ps-av w-12 h-12 rounded-full flex-shrink-0" style={{ background: "var(--grad)" }} />
              <div>
                <strong className="text-white text-sm block">@seu_perfil</strong>
                <small className="text-[#9d99b5] text-xs">Crescendo em tempo real 📈</small>
              </div>
            </div>

            <div className="ps-metric bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 mb-3 flex justify-between items-center">
              <div>
                <div className="l text-xs text-[#9d99b5]">Seguidores</div>
                <div className="v font-bold text-white text-lg mono">24.8k</div>
              </div>
              <div className="up text-xs font-bold text-[#a3e635]">▲ 18%</div>
            </div>

            <div className="ps-metric bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 mb-3 flex justify-between items-center">
              <div>
                <div className="l text-xs text-[#9d99b5]">Curtidas</div>
                <div className="v font-bold text-white text-lg mono">92.3k</div>
              </div>
              <div className="up text-xs font-bold text-[#a3e635]">▲ 34%</div>
            </div>

            <div className="ps-metric bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 mb-3 flex justify-between items-center">
              <div>
                <div className="l text-xs text-[#9d99b5]">Alcance</div>
                <div className="v font-bold text-white text-lg mono">318k</div>
              </div>
              <div className="up text-xs font-bold text-[#a3e635]">▲ 61%</div>
            </div>
          </div>

          <div className="ps-metric block bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3.5 mt-2">
            <div className="l text-xs text-[#9d99b5] mb-1">Engajamento (7 dias)</div>
            <div className="spark">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
