<!-- CompleteProfile.vue -->
<template>
  <div class="container mt-5">
    <div class="card mx-auto" style="max-width: 500px">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">請填寫必要資訊</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="formData.email"
              disabled
            />
          </div>
          <div class="mb-3">
            <label class="form-label">姓名</label>
            <input
              type="text"
              class="form-control"
              v-model="formData.name"
              disabled
            />
          </div>
          <div class="mb-3">
            <label class="form-label">身分證字號</label>
            <input
              type="text"
              class="form-control"
              v-model="formData.twId"
              required
            />
          </div>
          <div class="mb-3">
            <label class="form-label">手機號碼</label>
            <input
              type="tel"
              class="form-control"
              v-model="formData.phone"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 text-light">
            完成註冊
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { GoogleService } from "@/services/googleoauth-service";
import { useUserStore } from "@/stores/userStore";
import Swal from "sweetalert2";

const router = useRouter();
const userStore = useUserStore();
const formData = ref({
  email: "",
  name: "",
  twId: "",
  phone: "",
  tempToken: "",
});

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  formData.value.email = urlParams.get("email") || "";
  formData.value.name = urlParams.get("name") || "";
  formData.value.tempToken = urlParams.get("tempToken") || "";

  if (!formData.value.tempToken) {
    Swal.fire({
      icon: "error",
      title: "錯誤",
      text: "無效的註冊信息，請重新嘗試",
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "關閉",
      cancelButtonColor: "light",
    });
    router.push("/login");
  }
});

const handleSubmit = async () => {
  try {
    const response = await GoogleService.completeRegistration({
      twId: formData.value.twId,
      phone: formData.value.phone,
      tempToken: formData.value.tempToken,
    });

    // 處理登入
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      userStore.token = response.data.token;
      userStore.userId = response.data.userId;

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        iconColor: "black",
        title: "Google登入成功！",
        text: "您已成功完成註冊並登入",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      router.push("/");
    }
  } catch (error) {
    console.error("註冊失敗", error);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "註冊失敗",
      text: error.response?.data?.message || "發生錯誤，請重新嘗試",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
