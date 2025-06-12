import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes"


const router = createRouter({
 
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [...routes]
});

router.afterEach((to) => {
  document.title = (to.name as string) || 'Products Store';
});

export default router;