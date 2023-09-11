import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  resolve: {
    /**
     * Polyfills nodejs imports
     * @see https://vitejs.dev/config/shared-options.html#resolve-alias
     */
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  /**
   * Enables react
   * @see https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md
   */
  plugins: [react()],
});
