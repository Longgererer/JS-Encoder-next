import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import DefineOptions from "unplugin-vue-define-options/vite"

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      target: "esnext",
    },
    plugins: [
      vue(),
      DefineOptions(),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.vue"],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@assets": resolve(__dirname, "src/assets"),
        "@views": resolve(__dirname, "src/views"),
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@type": resolve(__dirname, "src/type"),
        "@store": resolve(__dirname, "src/store"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@scripts": resolve(__dirname, "src/scripts"),
        "@plugins": resolve(__dirname, "src/plugins"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use \"sass:map\";@import \"@/styles/index.scss\";",
        },
      },
    },
  }
})
