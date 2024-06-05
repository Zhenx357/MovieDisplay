
import {createStore} from 'vuex';
import { fetchMoviesByGenre } from '../api/api.js'; 


export default createStore({
  state: {
    genres: [
        { name: 'Action', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Comedy', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Thriller', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'War', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Romance', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Drama', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Crime', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Documentary', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
        { name: 'Horror', count: 0, movies: [], moviesLoaded: 3, currentIndex: 0},
      ],
  },
  mutations: {
    setMovies(state, { genreName, movies, count }) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre) {
        genre.movies = movies;
        genre.count = count;
      }
    },
    nextMovies(state, genreName) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre && genre.currentIndex + 3 < genre.movies.length) {
        genre.currentIndex += 3;
      }
    },
    previousMovies(state, genreName) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre && genre.currentIndex > 0) {
        genre.currentIndex -= 3;
      }
    },
  },
  actions: {
    // Load the movies for each genre
    async loadGenres({ commit, state }) {
      const promises = state.genres.map(async (genre) => {
        const { count, movies } = await fetchMoviesByGenre(genre.name.toLowerCase());
        commit('setMovies', { genreName: genre.name, movies, count });
      });
      await Promise.all(promises);
    },
    async loadMovieByGenre({ commit, state }, genreName) {
      const genre = state.genres.find(g => g.name === genreName);
      if (!genre) {
        throw new Error(`Genre "${genreName}" not found`);
      }
      const { count, movies } = await fetchMoviesByGenre(genreName.toLowerCase());
      commit('setMovies', { genreName, movies, count });
    },
  },
});