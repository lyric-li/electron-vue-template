import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
// 主页
const main = resolve => require(['@/pages/main-window'], resolve)
const home = resolve => require(['@/pages/main-window/home'], resolve)
const detail = resolve => require(['@/pages/main-window/detail'], resolve)
const sub = resolve => require(['@/pages/sub-window'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {
          path: '',
          name: 'home',
          component: home
        },
        {
          path: 'detail',
          name: 'detail',
          component: detail
        }
      ]
    },
    {
      path: '/sub',
      name: '/sub',
      component: sub
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
