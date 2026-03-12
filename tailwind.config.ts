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
        hostile: {
          cream: "#FFFDD0",
          yellow: "#FFFF99",
          lime: "#00ff00",
          pink: "#ff00ff",
          cyan: "#00ffff",
        }
      }
    },
  },
  plugins: [],
};
export default config;
