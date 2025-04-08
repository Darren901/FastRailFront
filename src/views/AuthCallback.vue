<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">登入中...</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Swal from "sweetalert2";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const userId = urlParams.get("userId");

  if (token && userId) {
    // 存儲令牌
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    userStore.token = token;
    userStore.userId = userId;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      iconColor: "black",
      title: "Google登入成功！",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    router.push("/");
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "登入處理失敗",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    router.push("/login");
  }
});
</script>
