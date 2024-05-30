import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import App from '../App.vue'

const vuetify = createVuetify({ /* options */ })

createApp(App)
  .use(vuetify)
  .mount('#app')

export default vuetify