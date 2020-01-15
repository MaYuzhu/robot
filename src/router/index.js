import Vue from 'vue'
import Router from 'vue-router'
import robotManagement from '@/pages/robotManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  //robots/robot-management
      name: 'robotManagement',
      component: robotManagement
    }
  ]
})
