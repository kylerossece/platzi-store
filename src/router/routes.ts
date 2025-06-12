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
    name: "Cart",
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
      
 
 

]