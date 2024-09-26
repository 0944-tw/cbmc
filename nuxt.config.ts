import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/view?id=:id": {
      swr: true
    }
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/algolia",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  algolia: {
    apiKey: "699ee0e080a255856220bb36e62d8e69",
    applicationId: "76O5YAWFNC",
    instantSearch: {
      theme: "algolia",
    },
  },
});
