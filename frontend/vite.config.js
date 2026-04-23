// Trigger Vite Hot Reload to fetch canvas-confetti
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});