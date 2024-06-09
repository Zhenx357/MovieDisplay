<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Wishlist</h1>
            </v-col>
            <v-col v-for="movie in wishlist" :key="movie.id" cols="3" sm="3" md="3">
                <MovieItem :cover="movie.cover" :title="movie.title" :movieID="movie.id" :wishlistBtn="false">
                    <template v-slot:button>
                        <v-btn class="text-center" color="red" @click="removeFromWishlist(movie)">
                            Remove from Wishlist
                        </v-btn>
                    </template>
                </MovieItem>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import MovieItem from '../MovieItem.vue';

export default {
    components: {
        MovieItem,
    },
    computed: {
        ...mapState(['wishlist']),
    },
    methods: {
        removeFromWishlist(movie) {
            this.$store.commit('removeFromWishlist', movie);
        },
    },
}

</script>