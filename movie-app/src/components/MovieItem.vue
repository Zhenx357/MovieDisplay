<template>
    <v-card>
        <v-card-title class="justify-center">
            {{ title }} 
         </v-card-title>
        <router-link :to="'/movie/' + movieID">
        <v-img :src="cover" class="movie-cover"></v-img>
    </router-link>
    <v-card-actions class="justify-center">
        <v-btn class="flex-grow-1" v-if="wishlistBtn" color="primary" @click="addToWishlist">Add to Wishlist</v-btn>
        <slot name="button"></slot>
    </v-card-actions>
 
    </v-card>
</template>

<script>
export default {
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
            this.$emit('add-to-wishlist',{
                cover: this.cover,
                title: this.title,
                id: this.movieID
            })
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