// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV !== 'test' },
  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxt/test-utils/module",
    "@nuxt/eslint",
    "nuxt-auth-utils",
    "nuxt-security",
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["@testing-library/jest-dom/vitest"]
      }
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
  },
  security: {
    rateLimiter: {
      tokensPerInterval: 20,
      interval: 'hour',
      driver: {
        name: 'lruCache'
      }
    },
    headers: {
      contentSecurityPolicy: {
        'script-src': ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
        'connect-src': ["'self'", "https:", "http:", "ws:", "wss:"]
      }
    }
  },
  fonts: {
    families: [{ name: "Baskervville", provider: "google" }],
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "GRHB | Groupe de Recherches Historiques de Busnes",
      htmlAttrs: { lang: "fr" },
    },
  },
});