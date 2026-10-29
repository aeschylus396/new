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
        // Red and cream signature editorial palette
        crimson: {
          DEFAULT: "#F20D3A",
          dark: "#C8102E",
          deep: "#9E0B25",
          muted: "#E9A0AA",
          soft: "rgba(242, 13, 58, 0.08)",
        },
        cream: {
          DEFAULT: "#F5F0E7",
          light: "#FAF7F2",
          dark: "#EADFCF",
          muted: "#E2D5C3",
        },
        noir: {
          DEFAULT: "#151515",
          deep: "#0B0B0B",
          card: "#1C1C1C",
          surface: "#242424",
        },
        // Semantic aliases
        primary: "#F20D3A",
        background: "#F5F0E7",
        foreground: "#151515",
        "border-red": "rgba(242, 13, 58, 0.35)",
        "border-cream": "rgba(245, 240, 231, 0.25)",
      },
      fontFamily: {
        display: ["var(--font-display)", "'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["var(--font-heading)", "'Plus Jakarta Sans'", "sans-serif"],
        body: ["var(--font-body)", "'Inter'", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.25em",
        mega: "0.35em",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(242, 13, 58, 0.15)",
        "editorial-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        "card-red": "0 15px 35px -5px rgba(242, 13, 58, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
