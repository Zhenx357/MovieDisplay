<template>
    <v-card>
        <v-img :src="cover" aspect-ratio="1.75"></v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-actions>
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
    },
    methods: {
        viewDetails() {
            
        },
    },
};
</script>