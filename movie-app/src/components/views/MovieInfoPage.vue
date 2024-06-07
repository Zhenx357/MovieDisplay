<template>
  <!-- ... -->
  <v-card-text>
    <h2>{{ movie.title }}</h2> <!-- Display the movie title -->
    <p>{{ movie.description }}</p> <!-- Display the movie description -->
  </v-card-text>
  <!-- ... -->
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState({
        movie: function(state) {
          return state.movieInfo;
        }
      }
      )
    },
    mounted() {
      console.log('Loading movie info');
  this.$store.dispatch('loadMovieInfo', this.$route.params.id)
    .catch(error => {
      console.error('Error loading movie info:', error);
    });
}

  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>