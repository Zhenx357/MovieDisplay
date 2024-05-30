import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import GenrePage from '../components/views/GenrePage.vue'
import MovieInfoPage from '../components/views/MovieInfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/genre/:genre', 
    name: 'GenrePage',
    component: GenrePage
  },
  {
    path: '/movie/:id',
    name: 'MovieInfoPage',
    component: MovieInfoPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router