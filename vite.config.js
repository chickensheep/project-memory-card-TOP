import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: "/project-memory-card-TOP/",
	plugins: [react()],
});
