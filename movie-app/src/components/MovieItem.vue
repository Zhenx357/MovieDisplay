<template>
    <!-- MovieItem component to reuse to show movies with cover, title and wishlish button-->
    <v-card>
        <v-card-title class="justify-center">
            {{ title }} 
        </v-card-title>
        <router-link :to="'/movie/' + movieID">
            <v-img :src="cover" class="movie-cover"></v-img>
        </router-link>
        <v-card-actions class="justify-center">
            <!-- Add to wishlist button -->
            <v-btn class="flex-grow-1" v-if="wishlistBtn" color="primary" @click="addToWishlist">Add to Wishlist</v-btn> <!-- v-if so i can disable the button on another component -->
            <slot name="button"></slot> <!-- slot for button -->
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    //  Props to pass the cover, title and movieID to another component
    props: {
        cover: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        movieID: {
            type: [String, Number],
            required: true,
        },
        wishlistBtn: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        addToWishlist() {
            const movie = {
                cover: this.cover,
                title: this.title,
                id: this.movieID
            };
            this.$store.commit('addToWishlist', movie);
        },
    },
    };
</script>

<style scoped>
.movie-cover {
    height: auto;
    width:  100%;
}
</style>