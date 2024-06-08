<template>
    <v-card>
        <router-link :to="'/movie/' + movieID">
            
        <v-img :src="cover" aspect-ratio="1.75"></v-img>
    </router-link>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-actions>
            <button v-if="wishlistBtn" @click="addToWishlist">Add to Wishlist</button>
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