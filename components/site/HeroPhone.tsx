"use client";
import React from "react";

export function HeroPhone() {
  return (
    <div className="hero-visual relative flex items-center justify-center h-full min-h-[620px]">
      <div className="phone-3d" id="phone3d">
        {/* Floating Neon Card 1: Likes (Pink Glow) */}
        <div className="chip chip-1">
          <div className="ci" style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)", boxShadow: "0 0 14px rgba(244,63,94,0.6)" }}>
            ❤️
          </div>
          <div>
            <strong className="text-white text-xs font-bold">+2.480</strong>
            <small className="text-[#fecdd3] text-[11px] block">curtidas hoje</small>
          </div>
        </div>

        {/* Floating Neon Card 2: Followers (Violet Glow) */}
        <div className="chip chip-2">
          <div className="ci" style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", boxShadow: "0 0 14px rgba(139,92,246,0.6)" }}>
            👥
          </div>
          <div>
            <strong className="text-white text-xs font-bold">+1.240</strong>
            <small className="text-[#ddd6fe] text-[11px] block">novos seguidores</small>
          </div>
        </div>

        {/* Floating Neon Card 3: Views (Cyan Glow) */}
        <div className="chip chip-3">
          <div className="ci" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", boxShadow: "0 0 14px rgba(6,182,212,0.6)" }}>
            ▶️
          </div>
          <div>
            <strong className="text-white text-xs font-bold">+18.9k</strong>
            <small className="text-[#cffafe] text-[11px] block">visualizações</small>
          </div>
        </div>

        {/* Pure CSS 3D iPhone Body */}
        <div className="phone">
          <span className="phone-side l" />
          <span className="phone-side l s2" />
          <span className="phone-side r" />
          <div className="phone-notch" />
          
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
              <div className="ig-post">
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

                <div className="post-img">
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

                <div className="post-cmt">Ver todos os 340 comentários</div>
                <div className="post-time">há 2 minutos</div>
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
