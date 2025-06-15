import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths({ projects: ["./tsconfig.json"] })],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app/"),
      "@entities": path.resolve(__dirname, "./src/entities/"),
      "@features": path.resolve(__dirname, "./src/features/"),
      "@shared": path.resolve(__dirname, "./src/shared/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@widgets": path.resolve(__dirname, "./src/widgets/"),
      "@processes": path.resolve(__dirname, "./src/processes/"),
      "@assets": path.resolve(__dirname, "./src/assets/")
    },
  },
});
