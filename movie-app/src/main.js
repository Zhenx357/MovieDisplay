import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/dist/vuetify.min.css'
import router from './router'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
