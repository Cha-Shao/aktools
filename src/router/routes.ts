export default [
  {
    path: "/",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/m",
    component: () => import("../views/mobile/index.vue"),
  },
];
