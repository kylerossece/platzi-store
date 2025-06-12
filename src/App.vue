<template>
  <div id="app">
   
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ route.name }}</v-toolbar-title>


      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'top' : undefined"
        temporary
      >
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"    
              @click="redirect(item.to)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
      </v-navigation-drawer>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
      </v-layout>

  </div>
</template>
<script setup>

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import routes from "./router/routes"
const drawer = ref(false)
const route = useRoute()
const items = routes.map(route => ({
  title: route.name,
  to: route.path,
  value: route.name,
}))

const redirect = (route) => {
  window.open(route, "_self")
}
</script>

