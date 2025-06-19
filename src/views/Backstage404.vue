<template>
  <div class="error-container">
    <div class="lottie-animation"></div>
    <div class="error-content">
      <h1>404</h1>
      <p>
        噢不！這個頁面好像走丟了。 <br />
        別擔心，我們帶你回首頁看看其他內容吧！
      </p>
      <RouterLink
        to="/backstage/home"
        class="btn btn-accent text-light btn-lg fs-6"
        >回到首頁</RouterLink
      >
    </div>
  </div>
</template>

<style>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.error-content {
  text-align: center;
}

.error-content h1 {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.error-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.lottie-animation {
  max-width: 400px;
  margin-bottom: 2rem;
}
</style>

<script setup>
import { onMounted } from "vue";
import lottie from "lottie-web";

onMounted(() => {
  const container = document.querySelector(".lottie-animation");
  if (container) {
    lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json",
    });
  }
});
</script>
