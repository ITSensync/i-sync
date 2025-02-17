import type { Config } from "tailwindcss";
import daisyui  from 'daisyui';

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
      fontFamily: {
        lexend_deca: ["var(--font-lexend-deca)"],
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"]
      }
    },
  },
  plugins: [
    daisyui,
  ],
} satisfies Config;
