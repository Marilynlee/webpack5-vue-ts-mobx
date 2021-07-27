import Router from 'vue-router'

import Home from '@/containers/home/index.vue'
import NotFound from '@/components/404/index.vue'

const routes = [
  {
    path: '/',
    name: '',
    meta: {
      title: '首页',
    },
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '主页',
      needLogin: false,
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'About',
      needLogin: false,
    },
    component: () => import('@/containers/about/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '页面不存在',
    },
    component: NotFound,
  },
]

const router = new Router({
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!routes.map((item) => item.path).includes(to.path)) await router.push('/404')
  next()
})
export default router
