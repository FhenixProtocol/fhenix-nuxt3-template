// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/style.scss',
  ],
  plugins: [
    {
      src: 'plugins/useBootstrap.client.ts',
      mode: 'client'
    }
  ],

  runtimeConfig: {
    public: {
      NETWORK_CHAIN_ID: process.env.NUXT_ENV_NETWORK_CHAIN_ID || "412346",
      NETWORK_RPC_URL: process.env.NUXT_ENV_NETWORK_RPC_URL || "https://test01.fhenix.zone/evm",
      NETWORK_EXPLORER_URL: process.env.NUXT_ENV_NETWORK_EXPLORER_URL || "http://your.explorer.url.here"
    }
  },  
})
