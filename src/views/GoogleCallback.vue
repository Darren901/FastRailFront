<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">處理Google登入中，請稍候...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { GoogleService } from "@/services/googleoauth-service";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");

  if (code && state) {
    try {
      const result = await GoogleService.handleCallback(code, state);

      if (result.data.status === "NEED_MORE_INFO") {
        localStorage.setItem("googleTempToken", result.data.tempToken);
        localStorage.setItem("googleEmail", result.data.email);
        localStorage.setItem("googleName", result.data.name);

        router.push("/complete-google-register");
      } else {
        localStorage.setItem("token", result.data.token);
        userStore.setUser(result.data.user);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          iconColor: "black",
          title: `Google登入成功！`,
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        router.push("/");
      }
    } catch (e) {
      console.error("Google登入處理失敗", e);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: e.response?.data?.message || "Google登入處理失敗",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      router.push("/login");
    }
  } else {
    router.push("/login");
  }
});
</script>
