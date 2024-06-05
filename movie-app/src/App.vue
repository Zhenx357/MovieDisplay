<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
import HomePage from './components/views/HomePage.vue';

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>