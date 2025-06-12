export default  [
  {
    path: "/",
    name: "Products",
     icon: "mdi-tshirt-crew-outline",
    component: () => import("../views/Products.vue"),
    meta: { transition: "slide-left" },

  },
  {
    path: "/cart",
    name: "Carts",
    icon: "mdi-cart-outline",
    component: () => import("../views/Cart.vue"),
    meta: { transition: "slide-left" },

  },
    {
    path: "/users",
    name: "Users",
    icon: "mdi-account",
    component: () => import("../views/Users.vue"),
    meta: { transition: "slide-left" },

  },
   {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { transition: "slide-left" },

  },
      
 
 

]