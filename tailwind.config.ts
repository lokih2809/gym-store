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
        dashboard: "#192237",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        slideInTop: {
          "0%": { transform: "translateY(-80%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(80%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-in-top": "slideInTop 0.5s ease-in-out forwards",
        "slide-in-bottom": "slideInBottom 0.5s ease-in-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-in-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
