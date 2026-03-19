import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#f3eee5",
        ink: "#0f1720",
        gold: "#b8863b",
        pine: "#163228",
        mist: "#dde7e2",
        coral: "#c96d52"
      },
      fontFamily: {
        sans: ["Satoshi", "system-ui", "sans-serif"],
        display: ["Clash Display", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 18px 60px rgba(15, 23, 32, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(15, 23, 32, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 32, 0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: [typography]
};
