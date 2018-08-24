// todo: check https://github.com/wmfs/tymly-quasar/commit/a71a1c606b1ffe538e18ec779edbd41783f9286d#diff-f96a949babb32e8348caf0e1a2298a68
// todo: check https://github.com/wmfs/tymly-quasar/commit/49c192ff1a332265c7e134156d8c4cbb182c3d8b#diff-f96a949babb32e8348caf0e1a2298a68R6

const getEnvVars = require('./src/lib/get-env-vars')

module.exports = function (ctx) {
  const envVars = getEnvVars()
  const viewscriptRoot = envVars.$VIEWSCRIPT_ROOT_PATH.slice(1, -1)
  return {
    plugins: [
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
    ],
    supportIE: false,
    build: {
      env: envVars,
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.resolve.symlinks = false
        cfg.resolve.alias.vue$ = 'vue/dist/vue.js'
        // cfg.resolveLoader.modules.push(`${viewscriptRoot}/node_modules`)
        // cfg.resolveLoader.modules.push('c:\\development\\viewscript\\packages')
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    framework: 'all',
    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      manifest: {
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {},
    electron: {
      extendWebpack (cfg) {},
      packager: {},
      builder: {}
    }
  }
}
