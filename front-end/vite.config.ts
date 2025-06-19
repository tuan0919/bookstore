import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  build: {
    target: "esnext",
    cssCodeSplit: false, // Đảm bảo CSS không bị tách nhỏ quá mức
    sourcemap: true, // Tạo sourcemap để debug
  },
});
