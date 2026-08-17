"use client";
import React from "react";

export function HeroPhone() {
  return (
    <div className="hero-visual relative flex items-center justify-center h-full min-h-[620px]">
      <div className="phone-3d" id="phone3d">
        {/* Floating Dynamic Metric Chips */}
        <div className="chip chip-1">
          <div className="ci" style={{ background: "rgba(236, 72, 153, 0.15)" }}>❤️</div>
          <div>
            <strong>+2.480</strong>
            <small>curtidas hoje</small>
          </div>
        </div>

        <div className="chip chip-2">
          <div className="ci" style={{ background: "rgba(139, 92, 246, 0.15)" }}>👥</div>
          <div>
            <strong>+1.240</strong>
            <small>novos seguidores</small>
          </div>
        </div>

        <div className="chip chip-3">
          <div className="ci" style={{ background: "rgba(34, 211, 238, 0.15)" }}>▶️</div>
          <div>
            <strong>+18.9k</strong>
            <small>visualizações</small>
          </div>
        </div>

        {/* 3D Phone Body */}
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

              {/* Post Feed */}
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
                  <b>seu_perfil</b> Crescendo todo dia com a EngajaPro 🚀✨
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
