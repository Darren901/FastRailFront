<template>
  <Nav></Nav>
  <RouterView />
  <Footer></Footer>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<style lang="scss">
@import "./assets/all";
</style>
