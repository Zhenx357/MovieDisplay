<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Genre</h1>
      </v-col>
      <v-col v-for="genre in genres" :key="genre.name" cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <!-- Button to go to 3 showcases -->
            <v-btn icon @click="previous(genre)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <!-- Display genre name and count of movies and link to genrepage when clicking -->
            <router-link :to="'/genre/' + genre.name">{{ genre.name }} ({{ genre.count }})</router-link>
            <!-- Button to go to next 3 showcases -->
            <v-btn icon @click="next(genre)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-row>
            <!-- Display 4 movies in a row -->
            <v-col v-for="movie in genre.movies.slice(genre.currentIndex, genre.currentIndex +4)" :key="movie.id" cols="3">
              <MovieItem :cover="movie.cover" :title="movie.title" :movieID="movie.id" @add-to-wishlist="AddToWishlist"></MovieItem>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// importing the function from API module
import {mapState, mapMutations} from 'vuex';
import MovieItem from '../MovieItem.vue';

export default {
  components: {
    MovieItem,
  },
  created() {
    this.loadGenres();
    console.log("loading Genres")
  },
  computed: {
    ...mapState(['genres']),
  },
  methods: {
    ...mapMutations(['nextMovies', 'previousMovies']),
    next(genre) {
      this.nextMovies(genre.name);
    },
    previous(genre) {
      this.previousMovies(genre.name);
    },
    loadGenres() {
      this.$store.dispatch('loadGenres');
    },
    AddToWishlist(movie) {
      console.log('handleAddToWishlist called', movie);
      this.$store.commit('addWishlist', movie);
    },
  },
};
</script>

<style scoped>

</style>