import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import GenrePage from '../components/views/GenrePage.vue'
import MovieInfoPage from '../components/views/MovieInfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/genre/', 
    name: 'GenrePage',
    component: GenrePage
  },
  {
    path: '/movie/',
    name: 'MovieInfoPage',
    component: MovieInfoPage
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router