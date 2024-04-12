import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-out": "fadeIn 0.2s ease-out reverse",
        slideLeftIn: "slideLeftIn 0.7s ease-in-out",
        slideFadeLeftIn: "slideLeftIn 0.7s ease-out, fadeIn 0.7s ease-out",
        infiniteRotate: "rotate 1s linear infinite",
        "slide-right-in": "slideInRight 0.5s ease-out",
        "slide-right-out": "slideOutRight 0.5s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
        "gradient-to-t": "linear-gradient(to top, black, transparent)",
      },
      backgroundColor: {
        "arrow-color": "var(--carousel-arrow-bg-color)",
        "buy-now": "yellowgreen",
        "menu-sheet-color": "#0e0e0e",
        "menu-sheet-color-sub": "#0f0f0f",
        "add-to-cart": "goldenrod",
      },
      color: {
        "text-color-ternary": "grey",
      },
      boxShadow: {
        "inset-top": "inset 0 5px 5px  rgba(125, 125, 125, 0.4)",
      },
      fill: {
        "dot-bg": "var(--carousel-arrow-bg-color)",
        "star-color": "var(--star-color, rgb(255,225,0))",
      },
      height: {
        "1/3screen": "33vh",
        "2/3screen": "66vh",
        "3/4screen": "75vh",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
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
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      padding: {
        "common-x": "1rem",
      },
      stroke: {
        "star-color": "var(--star-color, rgb(255,225,0))",
      },
    },
  },
  plugins: [],
};
export default config;
