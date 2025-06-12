export default  [
  {
    path: "/",
    name: "Products",
    component: () => import("../views/Products.vue"),
    meta: { transition: "slide-left" },

  },
    {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
    meta: { transition: "slide-left" },

  },
 
 

]