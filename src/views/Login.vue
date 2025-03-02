<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="min-height: 75vh"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style="width: 300px"
    >
      <h3>會員登入</h3>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          v-model="login.email"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput2" class="form-label">密碼</label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder="請輸入密碼"
          v-model="login.password"
        />
      </div>
      <div class="d-flex justify-content-between w-100">
        <p>
          還沒有帳號？<RouterLink to="/register" class="text-primary"
            >點此註冊</RouterLink
          >
        </p>
        <RouterLink class="text-primary">忘記密碼</RouterLink>
      </div>
      <button
        type="button"
        class="btn btn-light border d-flex align-items-center justify-content-center gap-2 w-100 py-2"
        @click="handleGoogleLogin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>使用Google帳號登入</span>
      </button>
      <button
        class="btn btn-primary text-light mt-3 w-100"
        @click="handleLogin"
      >
        登入
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { GoogleService } from "@/services/googleoauth-service";
const userStore = useUserStore();

const login = ref({
  email: "",
  password: "",
});

const router = useRouter();
const handleLogin = async () => {
  try {
    const success = await userStore.login(
      login.value.email,
      login.value.password
    );
    if (success) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        iconColor: "black",
        title: `登入成功！`,
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      router.push("/");
    }
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "無法登入",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    console.error(e);
  }
};

const handleGoogleLogin = async () => {
  try {
    const res = await GoogleService.login();
    if (res.data && res.data.redirectUrl) {
      window.location.href = res.data.redirectUrl;
    }
  } catch (e) {
    console.error("獲取Google登入連結失敗", e);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "獲取Google登入連結失敗",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
