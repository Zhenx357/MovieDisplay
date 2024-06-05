<template>
  <v-app>
    <NavigationBar />
    <v-main style="padding: 0; margin: 0;">

        <router-view />

    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'


export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>