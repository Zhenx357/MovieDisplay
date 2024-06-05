<template>
    <v-app>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="item.path">{{ item.title }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <!-- No need for router-view here -->
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { title: 'Home', path: '/' },
          { title: 'Genre' , path: '/genre'},
          { title: 'MovieInfo', path: '/movie' },
        ]
      }
    }
  }
  </script>