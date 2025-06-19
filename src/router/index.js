import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/backstage:pathMatch(.*)*",
      component: () => import("@/views/Backstage404.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/Frontstage404.vue"),
    },
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
      path: "/auth-callback",
      name: "AuthCallback",
      component: () => import("@/views/AuthCallback.vue"),
    },
    {
      path: "/complete-profile",
      name: "CompleteProfile",
      component: () => import("@/views/CompleteProfile.vue"),
    },
    {
      path: "/backstage/admin-login",
      name: "AdminLogin",
      component: () => import("@/views/AdminLogin.vue"),
    },
    {
      path: "/backstage/home",
      name: "BackstageHome",
      component: () => import("@/views/BackstageHome.vue"),
    },
    {
      path: "/backstage/stations",
      name: "BackstageStations",
      component: () => import("@/views/BackstageStations.vue"),
    },
    {
      path: "/backstage/members",
      name: "BackstageMembers",
      component: () => import("@/views/BackstageMembers.vue"),
    },
  ],
});

export default router;
