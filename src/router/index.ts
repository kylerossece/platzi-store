import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes"


const router = createRouter({
 
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { el: "#app", top: 0, behavior: "smooth" };
  },
  routes: [...routes]
});

export default router;