<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-typography variant="h1">Genres</v-typography>
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
            <v-row>
              <v-col v-for="movie in genre.movies.slice(0, 3)" :key="movie.id" cols="12" sm="6" md="4">
                <v-card>
                  <v-img :src="movie.cover" aspect-ratio="1.75"></v-img>
                  <v-card-title>{{ movie.title }}</v-card-title>
                  <v-card-actions>
                    <router-link :to="{ name: 'MovieInfo', params: { id: movie.id } }">
                      <v-btn>View Details</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
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
        genres,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>