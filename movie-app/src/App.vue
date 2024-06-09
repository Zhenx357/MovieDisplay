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
    // method to update the background style to include in the v
    updateBackground(style) {
      console.log('updateBackground called with:', style);
      this.backgroundStyle = `${style} background-size: cover;`;
    },
  },
};
</script>

<style scoped>
.v-main {
  padding: 0 !important;
  width: 100%;
  height: 100%;
}
</style>