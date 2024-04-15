import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ["vue"],
      dts: "./auto-imports.d.ts",
    }),
    Components({
      dts: true,
      resolvers: [ArcoResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      deep: true,
      allowOverrides: false,
      dirs: ["src/components"],
    }),
    Vue()
  ],
});
