// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot (/src/boot)
    boot: [
      'vuelidate'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'roboto-font',
      'material-icons',
      'fontawesome-v5'
    ],
    build: {
      publicPath: 'cardscript',
      distDir: 'docs',
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        // TODO: Might need tuning?
        // cfg.resolve.symlinks = false
        // cfg.resolve.alias.vue$ = 'vue/dist/vue.js'
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   // loader: 'eslint-loader',
        //   exclude: /(node_modules|quasar)/
        // })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      importStrategy: 'all',
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog',
        'AddressbarColor',
        'Screen',
        'Meta'
      ]
      // iconSet: 'material-icons',
      // lang: 'de' // Quasar language
    },
    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
