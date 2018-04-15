// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/addon/lint/lint.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCodemirror, {
  options: {
    lint: true,
    gutters: [
      'CodeMirror-lint-markers'
    ],
    mode: {
      name: 'application/json'
    },
    theme: 'paraiso-dark',
    lineNumbers: true,
    line: true
  },
  events: ['scroll']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
