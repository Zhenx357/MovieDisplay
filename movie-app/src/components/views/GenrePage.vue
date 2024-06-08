<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ genre }}</h1>
      </v-col>
      <v-row align="center" class="align-center">
        <v-col v-for="movie in movies" :key="movie.title" cols="2" sm="2" md="2">
          <MovieItem :cover="movie.cover" :title="movie.title" :movieID="movie.id"></MovieItem>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="previousPage">Previous</v-btn>
        <v-btn @click="nextPage">Next</v-btn>
      </v-row>
    </v-row>
    </v-container>
</template>
  
  <script>
import MovieItem from '../MovieItem.vue';
import { mapState } from 'vuex';

  export default {
    components: {
      MovieItem,
    },
    data() {
      return {
        page: 1,
      };
    },
    props: {
      genre: {
        type: String,
        required: true,
      },
    },
    computed: {
    ...mapState({
      movies: function(state) {
        return state.genres.find(g => g.name === this.genre)?.movies ?? []; //find function to find matching genre name and return movie array.
      }
    })
  },
  methods: {
    async nextPage() {
      this.page++;
      await this.$store.dispatch('loadMovieByGenre', { genre: this.genre, page: this.page, pageSize: 50 });
    },
    async previousPage() {
      if (this.page > 1) {
        this.page--;
        await this.$store.dispatch('loadMovieByGenre', { genre: this.genre, page: this.page, pageSize: 50 });
      }
    },
  },
  mounted() {
    this.$store.dispatch('loadMovieByGenre', { genre: this.genre, page: this.page, pageSize: 50 });
  },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>