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
</script>
