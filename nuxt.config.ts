// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  googleFonts: {
    families: {
      Inter: [400, 700],
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            "w-black": "#001133",
            "w-gray": "#989EAA",
            "w-blue": {
              100: "#E4F0FE",
              200: "#C3E0FB",
            },
            "w-green": "#CDF0EB",
            "w-yellow": "#FFF4DA",
            "w-red": "#FFD1D1",
          },
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
