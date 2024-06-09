<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between">
            {{ title }}
            <button v-if="wishlistBtn" @click="addToWishlist">
                <font-awesome-icon :icon="['fas', 'heart']" />
            </button>
            <slot name="button"></slot>
         </v-card-title>
        <router-link :to="'/movie/' + movieID">
        <v-img :src="cover" class="movie-cover"></v-img>
    </router-link>
        
 
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