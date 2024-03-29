import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      backgroundColor: {
        "arrow-color": "var(--carousel-arrow-bg-color)",
      },
      fill: {
        "dot-bg": "var(--carousel-arrow-bg-color)",
      },
      height: {
        "1/3screen": "33vh",
        "2/3screen": "66vh",
        "3/4screen": "75vh",
      },
    },
  },
  plugins: [],
};
export default config;
