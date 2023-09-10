import { createRouter, createWebHistory } from 'vue-router';
import CitySelection from '../pages/city-selection.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CitySelection
    },
    {
      path: '/detail/:country/:city',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/weather-detail/weather-detail.vue')
    }
  ]
})

export default router
