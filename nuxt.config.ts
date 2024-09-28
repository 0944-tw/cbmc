import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import axios from "axios"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/view?id=:id": {
      swr: true,
      ssr: true,
    },
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
    "@nuxtjs/sitemap",
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
  site: {
    url: "https://cbdc.bio",
  },
  sitemap: {
     
    routes: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      return data.map((post) => `/posts/${post.id}`)
    },
    generate: true,
    cacheTime: 1,
  },
  runtimeConfig: {
    public: {
      vercelRegion: process.env.VERCEL_REGION || "好問題",
      deployID: process.env.VERCEL_DEPLOYMENT_ID,
      isvercel: process.env.VERCEL
    }
  }
});
