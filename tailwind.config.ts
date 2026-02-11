import type { Config } from "tailwindcss";

/**
 * Simplified Tailwind config for MVP.
 * - No shadcn/ui or custom design tokens; default palette only.
 * - Dark mode: class-based (add "dark" to html); init script in index.html follows system preference.
 * - Add theme.extend.colors etc. here if custom colors are needed later.
 */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

