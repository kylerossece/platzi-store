import { createApp } from 'vue'
import './style.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {API} from "./api/server-url"

// @ts-ignore
import 'vuetify/styles'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persistedstate'
import 'aos/dist/aos.css'

const vuetify = createVuetify({
  components,
  directives,
})

AOS.init(); 

const app = createApp(App)
app.use(vuetify)
    .use(createPinia().use(piniaPersist))
   .use(router)
   .mount('#app');

app.config.globalProperties.$api = API;
