<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Genre</h1>
      </v-col>
      <v-col v-for="genre in genres" :key="genre.name" cols="12">
        <v-card>
          <v-card-title>
            {{ genre.name }} ({{ genre.count }}) <router-link :to="'/genre/' + genre.name">View All</router-link>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-row align="center" class="align-center">
            <v-col cols="1" class text="text-center">
              <v-btn icon @click="previous(genre)">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>
            <v-col v-for="movie in genre.movies.slice(genre.currentIndex, genre.currentIndex +3)" :key="movie.id" cols="3" sm="3" md="3">
              <MovieItem :cover="movie.cover" :title="movie.title" :movieID="movie.id"></MovieItem>
            </v-col>
            <v-col cols="1" class="text-center">
              <v-btn icon @click="next(genre)">
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
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>