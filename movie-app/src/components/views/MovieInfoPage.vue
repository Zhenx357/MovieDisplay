<template>
 <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ movieInfo.title }}</h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-img :src="movieInfo.cover" aspect-ratio="1.75"></v-img>
          <v-card-title>{{ movieInfo.title }}</v-card-title>
          <v-card-text>{{ movieInfo.programType }}</v-card-text>
          <v-card-text>{{ movieInfo.description }}</v-card-text>
          <v-card-text>{{ movieInfo.releaseYear }}</v-card-text>
          <v-card-text>{{ movieInfo.genres }}</v-card-text>
          <v-card-text>{{ movieInfo.credits }}</v-card-text>
          
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
  computed: {
    ...mapState(['movieInfo'])
  },
  mounted() {
    this.$store.dispatch('loadMovieInfo', this.$route.params.id)
      .catch(error => console.error('Error loading movie info:', error));
  }
};
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>