<template>

  <v-app> 
    <v-layout v-if="route.name != 'Login'">
      <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>{{ route.name }}</v-toolbar-title>
              <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="text-white"
          v-bind="props"
        >
          <v-icon class="mr-2">mdi-account</v-icon> {{ username ?? "" }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="cursor-pointer">
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-app-bar>
    
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'top' : undefined"

      >
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            @click="redirect(item.to)"
          >
            <v-list-item-title class="text-primary" v-if="item.title != 'Login'"><v-icon class="me-4">{{ item.icon }}</v-icon>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main> 
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-main>

    </v-layout>
    <v-layout v-else>
          <v-main class="bg-blue-lighten-5 d-flex align-center "> 
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-main>
    </v-layout>
  </v-app>

</template>

<script setup>

import { ref } from 'vue'
import { useAccount } from './store/account'
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router'
import routes from "./router/routes"
const drawer = ref(false)
const route = useRoute()
const router = useRouter();
const accountStore = useAccount();
const { username } = storeToRefs(accountStore);


const items = routes.map(route => ({
  title: route.name,
  to: route.path,
  icon: route.icon,
  value: route.name,
}))


const redirect = (route) => {
  window.open(route, "_self")
}

const logout = () => {
  accountStore.logout();    
  router.push('/login');   
};
</script>

