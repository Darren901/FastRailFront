<template>
  <div v-if="isAdminLoginView">
    <RouterView></RouterView>
  </div>

  <div class="d-flex" v-if="!isFrontend && !isAdminLoginView">
    <SideNav></SideNav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>

  <div v-if="isFrontend">
    <Nav></Nav>
    <RouterView />
    <Footer></Footer>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import SideNav from "./components/SideNav.vue";

const route = useRoute();
const isFrontend = computed(() => !route.path.startsWith("/backstage"));
const isAdminLoginView = computed(() =>
  route.path.startsWith("/backstage/admin-login")
);
</script>

<style lang="scss">
@import "./assets/all";
</style>
