import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      margin: {
        "10p": "10%",
      },
      keyframes: {
        rainbow: {
          "0%": { color: "red" },
          "20%": { color: "orange" },
          "40%": { color: "orange" },
          "60%": { color: "green" },
          "80%": { color: "blue" },
          "100%": { color: "violet" },
        },
      },
      animation: {
        rainbow: "rainbow 1s linear forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
