export default  [
  {
    path: "/",
    name: "Products",
     icon: "mdi-tshirt-crew-outline",
     // @ts-ignore
    component: () => import("../views/Products.vue"),
    meta: { transition: "slide-left" },

  },
  {
    path: "/cart",
    name: "Carts",
    icon: "mdi-cart-outline",
    // @ts-ignore
    component: () => import("../views/Cart.vue"),
    meta: { transition: "slide-left" },

  },
    {
    path: "/users",
    name: "Users",
    icon: "mdi-account",
    // @ts-ignore
    component: () => import("../views/Users.vue"),
    meta: { transition: "slide-left" },

  },
   {
    path: "/login",
    name: "Login",
    // @ts-ignore
    component: () => import("../views/Login.vue"),
    meta: { transition: "slide-left" },

  },
      
 
 

]