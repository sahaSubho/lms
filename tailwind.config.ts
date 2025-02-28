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
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        background: "#FAF6EB",
        foreground: "var(--foreground)",
        "custom-border": "rgba(38, 35, 34, 0.2)",
        grey: "grey",
        white: "#FFFFFF",
        textColor: {
          default: "#4D3F37",
          DEFAULT: "#4D3F37",
          lightBrown: "#4D3F37CC",
          yellow: "#FACF47",
          grey: "#676564",
        },
        margin: {
          auto: "auto",
        },
        width: {
          "fit-content": "fit-content",
        },
        brand: {
          background: "#FAF6EB",
          darkBrown: "#262322",
          brown: "#4D3F37",
          yellow: "#FACF47",
          lightYellow: "#FFF0C8",
          orange: "#E17846",
          purple: "#937ADB",
          red: '#EB5757',
          aqua: {
            DEFAULT: "#3DAB9E", // Original aqua color
            light: "rgba(61, 171, 158, 0.5)", // 50% opacity
            lighter: "rgba(61, 171, 158, 0.2)", // 20% opacity
            dark: "#2E857D", // Darker shade of aqua
          },
          darkYellow: "#A9873B",
          blue: "#67B3E1",
        },
      },
      fontWeight: {
        bold500: "500",
      },
      borderColor: {
        grey: "#2623221A",
        brown: "#4D3F3780",
        "dark-grey": "rgba(38, 35, 34, 0.2)",
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
