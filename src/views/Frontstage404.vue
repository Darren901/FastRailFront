<template>
  <section class="d-flex align-items-center min-vh-100 py-5">
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-6 order-md-2">
          <div class="lc-block">
            <div class="lottie-animation"></div>
          </div>
        </div>
        <div class="col-md-6 text-center text-md-start">
          <div class="lc-block mb-3">
            <div editable="rich">
              <!-- <h1 class="fw-bold h4">PAGE NOT FOUND!<br></h1> -->
            </div>
          </div>
          <div class="lc-block mb-3">
            <div editable="rich">
              <h1 class="display-1 fw-bold text-muted">Error 404</h1>
            </div>
          </div>
          <div class="lc-block mb-5">
            <div editable="rich">
              <p class="rfs-11 fw-light">
                噢不！這個頁面好像走丟了。 <br />
                別擔心，我們帶你回首頁看看其他內容吧！
              </p>
            </div>
          </div>
          <div class="lc-block">
            <a
              class="btn btn-lg fs-6 btn-primary text-light"
              href="#"
              role="button"
              >回到首頁</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
      path: "https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json",
    });
  }
});
</script>
