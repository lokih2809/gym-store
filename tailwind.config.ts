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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(80%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "100" },
        },
      },
      animation: {
        "slide-in": "slideIn 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
