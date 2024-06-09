<template>
      <v-navigation-drawer app permanent width="150">
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { title: 'Home', path: '/' },
          { title: 'Genre' , path: '/genre/:genre'},
          { title: 'MovieInfo', path: '/movie/:id' },
          { title: 'Wishlist', path: '/wishlistPage' }
        ]
      }
    }
  }
  </script>