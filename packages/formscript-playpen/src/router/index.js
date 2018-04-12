import Vue from 'vue'
import Router from 'vue-router'
import Playpen from '@/components/Playpen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Playpen',
      component: Playpen
    }
  ]
})
