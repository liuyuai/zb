import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import send from '@/components/send'
import list from '@/components/list'
import quick from '@/components/quick'
import preview from '@/components/preview'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/send',
      name: 'send',
      component: send
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/quick',
      name: 'quick',
      component: quick
    },
    {
      path: '/preview',
      name: 'preview',
      component: preview
    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    }
  ]
})
