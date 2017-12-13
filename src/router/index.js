import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomeView from '@/components/HomeView'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld,

    },
    {
      path: '/detail/:cityName',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/',
      name: 'homeview',
      component: HomeView
    },

  ]
})
