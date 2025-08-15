/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  // 添加EdgeOne相关配置
  base: "/", // 确保基础路径正确
  build: {
    outDir: "dist/static",
    assetsDir: ".", // 静态资源目录
    sourcemap: false, // 生产环境不需要sourcemap
    rollupOptions: {
      output: {
        manualChunks: undefined // 禁用代码分割，可能有助于解决某些部署问题
      }
    }
  }
});
