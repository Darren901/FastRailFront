import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/views/IndexView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/search-results",
      name: "TrainsDetail",
      component: () => import("@/views/TrainsDetail.vue"),
    },
    {
      path: "/confirm",
      name: "ConfirmTicket",
      component: () => import("@/views/ConfirmTicket.vue"),
    },
    {
      path: "/order/:orderNumber",
      name: "OrderSuccess",
      component: () => import("@/views/OrderSuccess.vue"),
    },
    {
      path: "/my-tickets",
      name: "MyTickets",
      component: () => import("@/views/MyTicket.vue"),
    },
    {
      path: "/google-callback",
      name: "GoogleCallback",
      component: () => import("@/views/GoogleCallback.vue"),
    },
    {
      path: "/complete-google-register",
      name: "CompleteGoogleRegister",
      component: () => import("@/views/CompleteGoogleRegister.vue"),
    },
  ],
});

export default router;
