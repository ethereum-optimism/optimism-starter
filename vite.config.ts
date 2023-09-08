import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { vitePluginEvmts } from "@evmts/vite-plugin";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * Defines global constant replacments
   * @see https://vitejs.dev/config/shared-options.html#define
   */
  define: {
    global: "globalThis",
  },
  /**
   * Fixes the `define` behavior which replaces `global` with `globalThis` where unappropriate
   * this is almost certainly a bug in wagmi (or these libraries transatively
   * and likely can be removed in the future
   * @see https://github.com/wagmi-dev/create-wagmi/pull/73/files
   * @see https://github.com/wagmi-dev/wagmi/issues/2989
   */
  build: {
    rollupOptions: {
      external: [
        "@safe-globalThis/safe-apps-provider",
        "@safe-globalThis/safe-apps-sdk",
      ],
    },
  },
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
  plugins: [react(), vitePluginEvmts()],
});
