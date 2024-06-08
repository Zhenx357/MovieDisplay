
import {createStore} from 'vuex';
import { fetchMoviesByGenre } from '../api/api.js'; 
import { fetchMovieInfo } from '../api/api.js';
import { fetchCredits } from '../api/api.js';


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
      movieInfo: {},
  },
  mutations: {
    setMovies(state, { genreName, movies, count }) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre) {
        genre.movies = movies;
        genre.count = count;
      }
    },
    // Load the next 3 movies
    nextMovies(state, genreName) {
      const genre = state.genres.find(g => g.name === genreName); // finds the genre that matches the genreName
      if (genre) {
        genre.currentIndex += 3;
      }
    },
    // Load the previous 3 movies
    previousMovies(state, genreName) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre && genre.currentIndex >=3) {
        genre.currentIndex -= 3;
      }
    },
    setMovieInfo(state, movieInfo) {
      state.movieInfo = movieInfo;
    }
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
    // Load the movies for a specific genre
    async loadMovieByGenre({ commit, state }, { genre: genreName, page, pageSize }) {
      const genre = state.genres.find(g => g.name === genreName);
      if (!genre) {
        throw new Error(`Genre "${genreName}" not found`);
      }
      const { count, movies } = await fetchMoviesByGenre(genreName.toLowerCase(), page, pageSize);
      commit('setMovies', { genreName, movies, count });
    },

    // loading movie info by using fetchMovieInfo and fetchCredits from api
    async loadMovieInfo({ commit }, id) {
      const movieInfo = await fetchMovieInfo(id);
      const credits = await fetchCredits(id);
      commit('setMovieInfo', { ...movieInfo, credits });
    }
  },
});