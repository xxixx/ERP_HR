import path from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  runtimeConfig: {
    // Private keys (서버에서만 사용)
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    
    // Public keys (클라이언트에서도 사용)
    public: {
      TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
      APP_VERSION: process.env.APP_VERSION
    }
  },
  assets: {
    dir: 'assets'
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/styles/print.css'
  ],
  vite: {
    resolve: {
      alias: {
       '~bootstrap': path.resolve(__dirname, "node_modules/bootstrap"),
       '~bootstrap-icons': path.resolve(__dirname, "node_modules/bootstrap-icons")
      }
    }
  }, 
  
  modules: [
    '@pinia/nuxt',
    'nuxt-icon'
    
    // 'jsonwebtoken'
    // '@pinia-plugin-persistedstate/nuxt', 
    // '@nuxtjs/cookie'
  ],
 
  plugins: [
    // '~/plugins/piniaPersistedState.client.ts', // Other plugins...
    '~/plugins/piniaPersistedState.client.ts',

   
  ],
  build: {
    transpile: ['jspdf-plugin-png'],
   
  },
  pinia: {
    autoImports: ['defineStore'],
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' }
      ]
    }
  }
})
