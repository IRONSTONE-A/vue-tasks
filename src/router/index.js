

// import işlemleri
import { createRouter, createWebHistory } from "vue-router";

// router oluşturdum. createWebHistory geçmiş için, routes rotaları oluşturdum
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index.vue"),
    },
  ],
});

export default router;
