<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-typography variant="h1">Genre</v-typography>
      </v-col>
      <v-col v-for="genre in genres" :key="genre.name" cols="12" md="6">
        <v-card>
          <v-card-title>
            <v-typography variant="h2">{{ genre.name }} ({{ genre.count }})</v-typography>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'Genre', params: { genre: genre.name.toLowerCase() } }">
              <v-btn text>View All</v-btn>
            </router-link>
          </v-card-title>
          <v-row align="center">
            <v-col cols="1">
              <v-btn icon @click="previousMovies(genre)">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>
            <v-col v-for="movie in genre.movies.slice(genre.currentIndex, genre.currentIndex +3)" :key="movie.id" cols="12" sm="6" md="4">
              <MovieItem :cover="movie.cover" :title="movie.title"></MovieItem>
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="nextMovies(genre)">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// importing the function from API module
import { fetchMoviesByGenre } from '../../api/api.js';
import MovieItem from '../MovieItem.vue';

export default {
  components: {
    MovieItem,
  },
  data() {
    return {
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
    };
  },
  async created() {
    await this.loadGenres();
  },

  methods: {
    async loadGenres() {
      const promises = this.genres.map(async (genre) => { //itereating over genres and collecting them in promises array
        const { count, movies } = await fetchMoviesByGenre(genre.name.toLowerCase()); //fetching movies by genre awaiting function to complete
        genre.count = count;
        genre.movies = movies;
      });
      await Promise.all(promises);
      },
      nextMovies(genre) {
      if (genre.currentIndex + 3 < genre.movies.length) {
        genre.currentIndex += 3;
      }
    },
    previousMovies(genre) {
      if (genre.currentIndex > 0) {
        genre.currentIndex -= 3;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>