<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-img :src="movie.cover" aspect-ratio="1.75"></v-img>
            <v-card-title>{{ movie.title }}</v-card-title>
            <v-card-text>
              <p>Details about {{ movie.title }} will go here.</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { genres } from '../../data/dummyData';
  
  export default {
    data() {
      return {
        movie: {},
      };
    },
    created() {
      const movieId = this.$route.params.id;
      genres.forEach((genre) => {
        const movie = genre.movies.find((m) => m.id === movieId);
        if (movie) {
          this.movie = movie;
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>