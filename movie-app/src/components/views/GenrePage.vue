<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ genre }} {{ movieCount }}</h1>
      </v-col>
      <v-row>
        <v-col v-for="movie in movies" :key="movie.title" cols="2">
          <MovieItem :cover="movie.cover" :title="movie.title" :movieID="movie.id"></MovieItem>
        </v-col>
      </v-row>
      <v-row justify="center" class="my-4">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="10"
          @input="changePage"
        ></v-pagination>
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
        pageSize: 12,
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
      },
      movieCount() {
        return this.$store.getters.getGenreCount(this.genre);
      },
    }),
    totalPages() {
      return Math.ceil(this.movieCount / this.pageSize); //calculate total pages based on movie count and page size
    },
  },
  methods: {
    async changePage() {
      await this.$store.dispatch('loadMovieByGenre', { genre: this.genre, page: this.page, pageSize: this.pageSize });
    },
  },
  watch: {
    //  Watch for changes in the page and run the changePage method
      page() {
        this.changePage();
      }
    },
  mounted() {
    this.changePage();
  },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>