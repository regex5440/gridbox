import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      animation: {
        slideLeftIn: "slideLeftIn 0.7s ease-in-out",
        slideFadeLeftIn: "slideLeftIn 0.7s ease-out, fadeIn 0.7s ease-out",
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
        "gradient-to-t": "linear-gradient(to top, black, transparent)",
      },
      backgroundColor: {
        "arrow-color": "var(--carousel-arrow-bg-color)",
        "buy-now": "yellowgreen",
      },
      fill: {
        "dot-bg": "var(--carousel-arrow-bg-color)",
      },
      height: {
        "1/3screen": "33vh",
        "2/3screen": "66vh",
        "3/4screen": "75vh",
      },
      keyframes: {
        slideLeftIn: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
export default config;
