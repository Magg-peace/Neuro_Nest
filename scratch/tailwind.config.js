/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        calmBlue: "#cce3ff",
        mintGlow: "#d6f6e7",
        peachPop: "#ffe0cc",
        sunny: "#ffe891",
        ink: "#1f2b3d",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(31, 43, 61, 0.09)",
      },
      borderRadius: {
        blob: "2rem",
      },
    },
  },
  plugins: [],
};