import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'credentials',
    alias: '/registration',
    component: import('../components/Credentials.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { layout: 'NavBar' },
    component: import('../components/Home.vue')
  },
  {
    path: '/add',
    name: 'add',
    meta: { layout: 'NavBar' },
    component: import('../components/Add.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    meta: { layout: 'NavBar' },
    component: import('../components/Edit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
