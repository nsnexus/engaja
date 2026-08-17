import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primitives
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        // Design tokens
        brand: {
          DEFAULT: "#8b5cf6",
          dim:     "#6d28d9",
          glow:    "#a78bfa",
        },
        surface: {
          base:    "#0D0B14",
          card:    "#161222",
          overlay: "#1E1830",
          hover:   "#241D38",
        },
        ink: {
          DEFAULT:   "#F0EEFF",
          secondary: "#A89FC8",
          muted:     "#6B6184",
          disabled:  "#3D3558",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong:  "rgba(255,255,255,0.14)",
          focus:   "#8b5cf6",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        danger:  "#ef4444",
        info:    "#6366f1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px", letterSpacing: "0.04em" }],
        xs:   ["12px", { lineHeight: "18px" }],
        sm:   ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg:   ["18px", { lineHeight: "28px" }],
        xl:   ["22px", { lineHeight: "32px" }],
        "2xl":["28px", { lineHeight: "36px", letterSpacing: "-0.02em" }],
        "3xl":["36px", { lineHeight: "44px", letterSpacing: "-0.03em" }],
        "4xl":["48px", { lineHeight: "56px", letterSpacing: "-0.04em" }],
      },
      spacing: {
        0.5: "2px",
        1:   "4px",
        1.5: "6px",
        2:   "8px",
        2.5: "10px",
        3:   "12px",
        4:   "16px",
        5:   "20px",
        6:   "24px",
        8:   "32px",
        10:  "40px",
        12:  "48px",
        16:  "64px",
        20:  "80px",
        24:  "96px",
      },
      borderRadius: {
        sm:  "4px",
        DEFAULT: "6px",
        md:  "8px",
        lg:  "12px",
        xl:  "16px",
        "2xl": "20px",
        full: "9999px",
      },
      boxShadow: {
        card:    "0 0 0 1px rgba(255,255,255,0.07), 0 4px 16px rgba(0,0,0,0.4)",
        glow:    "0 0 24px rgba(139,92,246,0.35)",
        "glow-sm":"0 0 12px rgba(139,92,246,0.25)",
        input:   "0 0 0 1px rgba(255,255,255,0.08)",
        focus:   "0 0 0 2px rgba(139,92,246,0.5)",
        btn:     "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        progress: {
          from: { width: "0%" },
          to:   { width: "var(--progress-width, 100%)" },
        },
      },
      animation: {
        "fade-in":  "fadeIn 200ms cubic-bezier(0.23,1,0.32,1) both",
        "slide-in": "slideIn 200ms cubic-bezier(0.23,1,0.32,1) both",
        "scale-in": "scaleIn 200ms cubic-bezier(0.23,1,0.32,1) both",
        shimmer:    "shimmer 2s linear infinite",
        ping:       "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        progress:   "progress 1s cubic-bezier(0.23,1,0.32,1) forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":  "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
        "shimmer-surface": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        "hero-glow":       "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.3) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
