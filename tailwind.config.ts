import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/atom/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF6EB",
        foreground: "var(--foreground)",
        "custom-border": "rgba(38, 35, 34, 0.2)",
        grey: "grey",
        white: "#FFFFFF",
        textColor: {
          default: "#4D3F37",
          lightBrown: "#4D3F37CC",
          yellow: "#FACF47",
        },
        margin: {
          auto: "auto",
        },
        brand: {
          darkBrown: "#262322",
          brown: "#4D3F37",
          yellow: "#FACF47",
          lightYellow: "#FFF0C8",
          orange: "#E17846",
        },
      },
      fontWeight: {
        bold500: "500",
      },
      borderColor: {
        grey: "#2623221A",
      },
      boxShadow: {
        grey: "0px 2px 8px 0px #4D3F3705",
        default: "0px 4px 8px 0px #4D3F370D",
      },
    },
  },
  plugins: [],
};
export default config;
