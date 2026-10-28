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
        background: "#0f1422", /* Modern illuminated slate */
        surface: "rgba(255, 255, 255, 0.06)",
        surfaceHover: "rgba(255, 255, 255, 0.10)",
        foreground: "#f8fafc",
        muted: "#94a3b8",
        "accent-blue": "#38bdf8",
        "accent-cyan": "#22d3ee",
        "accent-purple": "#a855f7",
        "accent-green": "#34d399",
        "glass-border": "rgba(255, 255, 255, 0.12)",
        "glass-border-hover": "rgba(255, 255, 255, 0.25)",
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
