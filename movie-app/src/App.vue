<template>
  <v-app>
    <NavigationBar />
    <v-main :style="backgroundStyle" class="pa-0">
        <router-view @backgroundChange="updateBackground" />
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data(){
    return{
      backgroundStyle: '',
    }
  },
  methods: {
    updateBackground(style) {
      console.log('updateBackground called with:', style); // Add this line
      this.backgroundStyle = style;
    },
  },
};
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>