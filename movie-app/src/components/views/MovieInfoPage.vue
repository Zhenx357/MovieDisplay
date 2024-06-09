<template>
 <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class ="movie-card">
          <v-card-title> <h1>{{ movieInfo.title }}</h1></v-card-title>
          <v-row>
            <v-col cols="12" md="6">
              <v-img :src="movieInfo.cover" class="movie-cover"></v-img>
            </v-col>
            <v-col cols="12" md="6" class ="movie-details">
              <iframe class ="trailer":src="'https://www.youtube.com/embed/' + movieInfo.trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <v-card-text class="movie-description">{{ movieInfo.description }}</v-card-text>
              <v-card-text> <strong> Genre(s):</strong>{{ movieInfo.genres }} </v-card-text>
              <v-card-text> <strong> Released in:</strong> {{ movieInfo.releaseYear }} </v-card-text>
          <v-card-text v-if="movieInfo.credits">
            <div><strong>Directors:</strong></div>
            <div>{{ movieInfo.credits.directors [0]}}</div> 
            <!-- only display one director, since there is duplicate data fetched from api -->
          </v-card-text>
          <v-card-text v-if="movieInfo.credits">
            <div><strong>Actors:</strong></div>
            <div class="actors">
              <div v-for="(actor, index) in movieInfo.credits.actors" :key="'actor-' + index">
                {{ actor }},
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <btn><v-btn class="flex-grow-1" color="primary" @click="addToWishlist">Add to Wishlist</v-btn></btn>
          </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
  computed: {
    ...mapState(['movieInfo'])
  },
  mounted() {
    this.$store.dispatch('loadMovieInfo', this.$route.params.id)
      .catch(error => console.error('Error loading movie info:', error));
  },
  methods: {
    ...mapMutations(['addWishlist']),
    addToWishlist() {
      const movie = {
        id: this.movieInfo.id,
        title: this.movieInfo.title,
        cover: this.movieInfo.cover,
        // Add any other necessary movie data...
      };
      this.addWishlist(movie);
    },
    // ...
  },
};

</script>
  
 <style scoped>
.movie-card {
  padding: 20px;
}

.movie-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-description {
  margin-top: 20px;
}

.trailer {
  width: 100%;
  height: 300px;
}

.actors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

</style>