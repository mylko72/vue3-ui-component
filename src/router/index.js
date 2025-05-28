import { createRouter, createWebHistory } from 'vue-router'
import TabView from '@/views/TabView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TabView,
    },
    {
      path: '/tab',
      name: 'tab',
      component: () => import('../views/TabView.vue'),
    },
    {
      path: '/accordion',
      name: 'accordion',
      component: () => import('../views/AccordionView.vue'),
    },
    {
      path: '/popup',
      name: 'popup',
      component: () => import('../views/PopupView.vue'),
    },
    {
      path: '/tooltip',
      name: 'tooltip',
      component: () => import('../views/TooltipView.vue'),
    },
    {
      path: '/spin',
      name: 'spin',
      component: () => import('../views/SpinView.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
  ],
})

export default router
