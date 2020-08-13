require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/css/bootstrap-grid.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap' },
      { rel: 'stylesheet', href:'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/scss/main.scss',

  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/firebase',
    { src: '~/plugins/infiniteloading', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  /*
  ** MomentJS for NuxtJS
  */
  moment: {
    locales: ['vi']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    '@nuxtjs/style-resources'
  ],


  /*
  ** Style resources configuration
  */
  styleResources: {
    // your settings here
    sass: [],
    scss: [],
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL || 'https://cudidi-web.herokuapp.com',
    proxyHeaders: false,
    credentials: false
  },

  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3009'
  },

  /*
  ** Toast configuration
  */
  toast: {
    position: 'bottom-center',
    fitToScreen: true,
    fullWidth: true,
    singleton: true
  },

  auth: {
    strategies: {
        google: {
          client_id: '759791052216-e9nmv3i871md2gfaf274bru9a97ut95t.apps.googleusercontent.com',
          _scheme: 'oauth2',
          authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
          userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
          scope: ['openid', 'profile', 'email'],
          access_type: undefined,
          access_token_endpoint: undefined,
          response_type: 'token',
          token_type: 'Bearer',
          redirect_uri: 'http://localhost:3000',
          token_key: 'access_token',
          state: 'UNIQUE_AND_NON_GUESSABLE'
        },
    }
  },

  /*
  ** Config manifest for PWA Web App
  */
  manifest: {
    short_name: 'Project short Name',
    name: 'Project Name',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    description: 'Start NuxtJS from Scratch!',
    lang: 'vi-VN',
    orientation: 'portrait-primary'
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: !isProd,
    cache: !isProd,
    cssSourceMap: !isProd,
    optimization: {
      minimize: isProd
    },
    extractCss: isProd,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
