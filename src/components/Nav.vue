<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="ms-5">
        <i class="bi bi-train-front fs-4 me-2 text-primary"></i>
        <RouterLink to="/" class="navbar-brand fs-4" href="#"
          >台灣高鐵</RouterLink
        >
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link active"
              aria-current="page"
              href="#"
              >首頁</RouterLink
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">車次查詢</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">訂票須知</a>
          </li>
          <li v-if="userStore.isLoggedIn" class="nav-item">
            <a class="nav-link" href="#" @click="userStore.logout">登出</a>
          </li>
          <RouterLink
            v-if="!userStore.isLoggedIn"
            to="login"
            class="btn btn-outline-primary me-5 px-4"
            >登入</RouterLink
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<style scoped>
.nav-item {
  margin-right: 1.5rem;
}

.nav-link:hover {
  color: var(--bs-primary);
}
</style>
