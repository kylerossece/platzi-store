import { createRouter, createWebHistory } from "vue-router";
import { useAccount } from "../store/account";

import routes from "./routes"


const router = createRouter({
 
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [...routes]
});

router.beforeEach(async (routeTo, routeFrom, next) => {
  

  const store = useAccount();

  const token = store.token

  const publicPages = ['/login'];
  const authPages = !publicPages.includes(routeTo.path)

  if (authPages && !token) {
    return next('/login')
  }

  next();
});
router.afterEach((to) => {
  document.title = (to.name as string) || 'Products Store';
});

export default router;