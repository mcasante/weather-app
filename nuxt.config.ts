// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style.scss" as *;',
        },
      },
    },
  },
});
