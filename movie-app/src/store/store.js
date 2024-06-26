
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
      movieInfo: {},// object containing the movie info
      wishlist: []// array containing the movies in the wishlist
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
        if (genre.currentIndex + 4 >= genre.movies.length) {
          genre.currentIndex = 0; // reset to start if we're at the end
        } else {
          genre.currentIndex += 4;
        }
      }
    },
    // Load the previous 3 movies
    previousMovies(state, genreName) {
      const genre = state.genres.find(g => g.name === genreName);
      if (genre) {
        if (genre.currentIndex - 4 < 0) {
          genre.currentIndex = genre.movies.length - 4; // reset to end if we're at the start
        } else {
          genre.currentIndex -= 4;
        }
      }
    },
    setMovieInfo(state, movieInfo) {
      state.movieInfo = movieInfo;
    },
// Add to wishlist function
    addToWishlist(state, movie) {
      if(!state.wishlist.find(item => item.id === movie.id)) { //checks if the movie is already in the wishlist
        state.wishlist.push(movie); // adds the movie to the wishlist
        console.log('Movie added to wishlist:', movie);
      }
      else {
        console.log('Movie already in wishlist:', movie);
      }
    },

    removeFromWishlist(state, movie) {
      state.wishlist = state.wishlist.filter(item => item.id !== movie.id);
      console.log('Movie removed from wishlist:', movie);
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
    // Load the movies for a specific genre
    async loadMovieByGenre({ commit, state }, { genre: genreName, page, pageSize }) {
      console.log('Loading movies for genre:', genreName, 'page:', page, 'pageSize:', pageSize)
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
    },
    
    removeFromWishlist({ commit }, movie) {
      commit('removeFromWishlist', movie);
    },
  },

  getters: {
    // Get the movies count for a specific genre
    getGenreCount: (state) => (genreName) => {
      const genre = state.genres.find(g => g.name === genreName);
      return genre ? genre.count : 0;
  }
},
});