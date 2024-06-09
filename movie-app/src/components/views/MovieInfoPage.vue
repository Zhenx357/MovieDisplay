<template>
 <v-container class="no-padding" :style="genreBackground">
    <v-row>
      <v-col cols="12">
        <v-card class ="movie-card">
          <v-card-title> <h1>{{ movieInfo.title }}</h1></v-card-title>
          <v-row >
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
            <!-- only display one director, since there is duplicate data fetched from api -->
            <div>{{ movieInfo.credits.directors [0]}}</div> 
          </v-card-text>
          <v-card-text v-if="movieInfo.credits">
            <div><strong>Actors:</strong></div>
            <!-- displays all actors from the actor array-->
            <div class="actors">
              <div v-for="(actor, index) in movieInfo.credits.actors" :key="'actor-' + index">
                {{ actor }},
              </div>
            </div>
          </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn class="flex-grow-1" color="primary" x-large outlined  @click="AddToWishlist(movieInfo)">Add to Wishlist</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
 </v-container>
</template>
  
  <script>
  import { mapState} from 'vuex';

  export default {
  computed: {
    ...mapState(['movieInfo']),
    //  Set the background image based on the genre of the movie
    genreBackground() {
      if(this.movieInfo.genres && this.movieInfo.genres.length > 0) { //check if genre is available
        let genre = this.movieInfo.genres[0].replace(/\s+/g, '-').toLowerCase(); //replace space with dash and convert to lowercase
        return `background-image: url('/public/${genre}.jpg'); background-size: cover`;  //return the background image based on the genre
      }
      return ''; //return empty string if genre is not available
    },
  },
  //  Fetch the movie info when the component is mounted
  mounted() {
    this.$store.dispatch('loadMovieInfo', this.$route.params.id)
      .catch(error => console.error('Error loading movie info:', error));
  },
  methods: {
    AddToWishlist(movieInfo) {
      console.log('AddToWishlist called', movieInfo);
      // Add the movie to the wishlist
      this.$store.commit('addToWishlist', movieInfo);
    },
  },
  // Emit the background change event when the movie info is changed
  watch: {
    movieInfo() {
      this.$emit('backgroundChange', this.genreBackground);
    },
  },
  // method to change the background image back to default when leaving the page
  beforeRouteLeave(to, from, next) {
    this.$emit('backgroundChange', 'default-background');
    console.log('beforeRouteLeave called');
    next();
  },
  
};

</script>
  
 <style scoped>
.movie-card {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5)
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
.no-padding {
  padding: 0 
}

.v-card-text, h1 {
  color: black;
}

</style>