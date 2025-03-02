<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="min-height: 75vh"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style="width: 300px"
    >
      <h3>完成註冊</h3>
      <p>請補充以下資料完成Google帳號註冊</p>

      <div class="mb-3 w-100">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="userData.email"
          disabled
        />
      </div>

      <div class="mb-3 w-100">
        <label for="name" class="form-label">姓名</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="userData.name"
          disabled
        />
      </div>

      <div class="mb-3 w-100">
        <label for="twId" class="form-label">身分證字號</label>
        <input
          type="text"
          class="form-control"
          id="twId"
          placeholder="請輸入國民身分證字號"
          v-model="userData.twId"
        />
      </div>

      <div class="mb-3 w-100">
        <label for="phone" class="form-label">手機號碼</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          placeholder="請輸入手機號碼"
          v-model="userData.phone"
        />
      </div>

      <button
        class="btn btn-primary text-light mt-3 w-100"
        @click="handleComplete"
      >
        完成註冊
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { GoogleService } from "@/services/googleoauth-service";

const router = useRouter();
const userStore = useUserStore();

const userData = reactive({
  email: "",
  name: "",
  twId: "",
  phone: "",
  tempToken: "",
});

onMounted(() => {
  userData.email = localStorage.getItem("googleEmail") || "";
  userData.name = localStorage.getItem("googleName") || "";
  userData.tempToken = localStorage.getItem("googleTempToken") || "";

  if (!userData.email || !userData.tempToken) {
    router.push("/login");
  }
});

const handleComplete = async () => {
  if (!userData.twId || !userData.phone) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "請填寫所有必要資料",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return;
  }

  try {
    const result = await GoogleService.completeRegistration({
      tempToken: userData.tempToken,
      twId: userData.twId,
      phone: userData.phone,
    });

    localStorage.setItem("token", result.data.token);
    userStore.userId = result.data.userId;

    localStorage.removeItem("googleTempToken");
    localStorage.removeItem("googleEmail");
    localStorage.removeItem("googleName");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      iconColor: "black",
      title: `註冊成功！`,
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    router.push("/");
  } catch (e) {
    console.error("完成註冊失敗", e);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response?.data?.message || "完成註冊失敗",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
