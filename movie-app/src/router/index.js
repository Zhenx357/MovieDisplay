import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import GenrePage from '../components/views/GenrePage.vue'
import MovieInfoPage from '../components/views/MovieInfoPage.vue'
import WishlistPage from '../components/views/WishlistPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/genre/:genre', 
    name: 'GenrePage',
    component: GenrePage,
    props: true
  },
  {
    path: '/movie/:id',
    name: 'MovieInfoPage',
    component: MovieInfoPage,
    props: true
  },
  {
    path: '/wishlistPage',
    name: 'Wishlist',
    component: WishlistPage,
    props: (route) => ({ movies: route.query.movies })
  }

];

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router