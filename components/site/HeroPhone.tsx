"use client";
import React from "react";

export function HeroPhone() {
  return (
    <div className="hero-visual relative flex items-center justify-center h-full min-h-[660px] pb-10">
      {/* Dynamic Ambient Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-pink-600/30 via-violet-600/35 to-cyan-500/25 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />

      <div className="phone-3d relative" id="phone3d">
        {/* Floating Neon Card 1: Likes (Pink Glow) - Top Left */}
        <div
          className="absolute -top-3 -left-28 sm:-left-32 z-30 animate-[floaty_4.2s_ease-in-out_infinite] pointer-events-none"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#180d24]/90 backdrop-blur-xl border border-rose-500/70 shadow-[0_0_35px_rgba(244,63,94,0.5),inset_0_0_15px_rgba(244,63,94,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(244,63,94,0.7)] flex-shrink-0">
              ❤️
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono leading-none mb-0.5">+2.480</div>
              <div className="text-[11px] font-semibold text-rose-300">curtidas hoje</div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 2: Followers (Violet Glow) - Mid Left */}
        <div
          className="absolute top-[260px] -left-32 sm:-left-36 z-30 animate-[floaty_5s_ease-in-out_infinite_1s] pointer-events-none"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#140e2c]/90 backdrop-blur-xl border border-violet-500/70 shadow-[0_0_35px_rgba(168,85,247,0.5),inset_0_0_15px_rgba(168,85,247,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(168,85,247,0.7)] flex-shrink-0">
              👥
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono leading-none mb-0.5">+1.240</div>
              <div className="text-[11px] font-semibold text-violet-300">novos seguidores</div>
            </div>
          </div>
        </div>

        {/* Floating Neon Card 3: Views (Cyan Glow) - Bottom Right */}
        <div
          className="absolute bottom-20 -right-24 sm:-right-28 z-30 animate-[floaty_4.6s_ease-in-out_infinite_2s] pointer-events-none"
          style={{ transform: "translateZ(95px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0a1830]/90 backdrop-blur-xl border border-cyan-400/70 shadow-[0_0_35px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.2)]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm shadow-[0_0_15px_rgba(34,211,238,0.7)] flex-shrink-0">
              ▶
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight mono leading-none mb-0.5">+18.9k</div>
              <div className="text-[11px] font-semibold text-cyan-300">visualizações</div>
            </div>
          </div>
        </div>

        {/* Solid 3D Smartphone Extruded Chassis */}
        <div className="phone">
          {/* Volumetric Thickness Extrusion Layers */}
          <div className="phone-depth-1" />
          <div className="phone-depth-2" />
          <div className="phone-depth-3" />
          <div className="phone-back" />

          {/* Right Metallic Chamfered Edge */}
          <div className="phone-edge-right" />

          {/* Hardware Buttons */}
          <span className="phone-btn-power" />
          <span className="phone-btn-vol-up" />
          <span className="phone-btn-vol-down" />

          {/* Dynamic Island / Notch */}
          <div className="phone-notch" />

          {/* Screen Content */}
          <div className="phone-screen">
            <div className="phone-glass" />
            <div className="ig">
              {/* Status Bar */}
              <div className="ig-status">
                <span>9:41</span>
                <span className="sig">📶 &nbsp; 📡 &nbsp; 🔋</span>
              </div>

              {/* Instagram Header */}
              <div className="ig-head">
                <span className="ig-logo">Instagram</span>
                <span className="hi">➕ &nbsp; ♡ &nbsp; ✈️</span>
              </div>

              {/* Stories Bar */}
              <div className="ig-stories">
                <div className="story">
                  <span className="ring me">
                    <i style={{ background: "#111 url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80') center/cover" }} />
                  </span>
                  <small>Seu story</small>
                </div>
                <div className="story">
                  <span className="ring">
                    <i style={{ background: "#111 url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80') center/cover" }} />
                  </span>
                  <small>marina.s</small>
                </div>
                <div className="story">
                  <span className="ring">
                    <i style={{ background: "#111 url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80') center/cover" }} />
                  </span>
                  <small>lucas_fit</small>
                </div>
                <div className="story">
                  <span className="ring">
                    <i style={{ background: "#111 url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80') center/cover" }} />
                  </span>
                  <small>bia.makeup</small>
                </div>
                <div className="story">
                  <span className="ring">
                    <i style={{ background: "#111 url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80') center/cover" }} />
                  </span>
                  <small>rafa.dev</small>
                </div>
              </div>

              {/* Feed Post */}
              <div className="ig-post flex-1 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="post-top">
                    <span className="pav">
                      <i style={{ background: "#111 url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80') center/cover" }} />
                    </span>
                    <div>
                      <strong>seu_perfil</strong>
                      <small>Parauapebas, Pará</small>
                    </div>
                    <span className="dots">⋯</span>
                  </div>

                  <div className="post-img !h-[210px]">
                    <span className="heart-pop">♥</span>
                  </div>

                  <div className="post-actions">
                    <span className="liked">♥</span>
                    <span>💬</span>
                    <span>✈️</span>
                    <span className="save">🔖</span>
                  </div>

                  <div className="post-likes">
                    Curtido por <b>marina.s</b> e <b>outras 12.480 pessoas</b>
                  </div>

                  <div className="post-cap">
                    <b>seu_perfil</b> Gratidão por cada conquista! 🚀✨
                  </div>
                </div>

                <div className="pb-1">
                  <div className="post-cmt">Ver todos os 340 comentários</div>
                  <div className="post-time">há 2 minutos</div>
                </div>
              </div>

              {/* Bottom Tab Bar */}
              <div className="ig-tabs">
                <span>🏠</span>
                <span>🔍</span>
                <span>➕</span>
                <span>🎬</span>
                <span className="tav" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
