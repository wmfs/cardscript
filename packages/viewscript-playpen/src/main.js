// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import Vuetify from 'vuetify'
import Viewscript from 'viewscript-vue-component'
import sdk from 'viewscript-vue-sdk'

import 'vuetify/dist/vuetify.min.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/addon/lint/lint.css'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

import App from './App'
import router from './router'

// https://github.com/quasarframework/quasar/issues/1576
// import Quasar from 'quasar-framework/dist/quasar.mat.esm'
// import 'quasar-framework/dist/umd/quasar.mat.css'

Vue.config.productionTip = false
Vue.use(VueTabs)
Vue.use(Vuetify)
// Vue.use(Quasar)
Vue.use(Viewscript)
Vue.use(VueCodemirror, {
  options: {
    mode: {
      name: 'application/json'
    },
    theme: 'paraiso-dark',
    lineNumbers: true,
    line: true
  },
  events: ['scroll']
})

sdk.addFilters(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
