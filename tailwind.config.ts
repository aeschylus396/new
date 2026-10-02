import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030305", /* Deep cinematic black */
        surface: "rgba(15, 18, 32, 0.45)",
        surfaceHover: "rgba(25, 30, 48, 0.6)",
        foreground: "#f4f4f5",
        muted: "#a1a1aa",
        "accent-blue": "#3b82f6",
        "accent-cyan": "#06b6d4",
        "accent-purple": "#8b5cf6",
        "accent-green": "#10b981",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-border-hover": "rgba(255, 255, 255, 0.15)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 24px 40px -8px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "glass-hover": "0 32px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
        glow: "0 0 40px -10px rgba(59, 130, 246, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
