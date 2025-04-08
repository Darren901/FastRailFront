<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="min-height: 75vh"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style="width: 300px"
    >
      <h3>會員註冊</h3>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          v-model="register.email"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput2" class="form-label">密碼</label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder="請輸入密碼"
          v-model="register.password"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput3" class="form-label">姓名</label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput3"
          placeholder="請輸入姓名"
          v-model="register.name"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput4" class="form-label"
          >身分證字號</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput4"
          placeholder="請輸入國民身分證字號"
          v-model="register.twId"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="exampleFormControlInput5" class="form-label"
          >手機號碼</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput5"
          placeholder="請輸入手機號碼"
          v-model="register.phone"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="email-verification " class="form-label"
          ><span class="text-success">OTP驗證</span></label
        >
        <div class="d-flex gap-3">
          <input
            type="text"
            class="form-control"
            id="email-verification"
            placeholder="請輸入四位驗證碼"
            v-model="register.otp"
          />
          <button
            class="btn"
            :class="[
              otpState.isCountingDown
                ? 'btn-primary text-light'
                : 'btn-outline-primary',
            ]"
            @click="handleSendOtp"
            :disabled="otpState.isCountingDown || otpState.showSpinner"
          >
            <span style="text-wrap: nowrap"
              >{{ otpState.buttonText }}
              <div
                v-if="otpState.showSpinner"
                class="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div></span
            >
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between w-100">
        <p>
          已經有帳號了？<RouterLink to="login" class="text-primary"
            >點此登入</RouterLink
          >
        </p>
      </div>
      <button
        class="btn btn-primary text-light mt-3 w-100"
        @click="handleRegister"
      >
        註冊
      </button>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/userStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const register = reactive({
  email: "",
  password: "",
  name: "",
  twId: "",
  phone: "",
  otp: "",
});

const COUNTDOWN_DURATION = 60; // OTP 倒數秒數
const otpState = reactive({
  isCountingDown: false,
  countdown: 0,
  buttonText: "發送驗證碼",
  showSpinner: false,
});

const userStore = useUserStore();
const router = useRouter();

const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    iconColor: icon === "success" ? "black" : undefined,
    title: title,
    timer: 2500,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};

const handleRegister = async () => {
  try {
    const success = await userStore.register(register);
    if (success) {
      router.push("/login");
      showToast("success", "註冊成功！");
    }
  } catch (e) {
    showToast("error", e.response?.data?.message || "註冊失敗");
  }
};

const handleSendOtp = async () => {
  if (otpState.isCountingDown) return;

  if (!register.email) {
    showToast("error", "請先填寫Email");
    return;
  }

  try {
    otpState.showSpinner = true;
    const res = await userStore.sendOtp(register.email);
    showToast("success", res.data.message);

    startOtpCountdown();
  } catch (e) {
    showToast("error", e.response?.data?.message || "傳送驗證碼發生錯誤");
  } finally {
    otpState.showSpinner = false;
  }
};

const startOtpCountdown = () => {
  otpState.isCountingDown = true;
  otpState.countdown = COUNTDOWN_DURATION;
  otpState.buttonText = `已發送(${otpState.countdown})`;

  const timer = setInterval(() => {
    otpState.countdown--;
    otpState.buttonText = `已發送(${otpState.countdown})`;

    if (otpState.countdown <= 0) {
      clearInterval(timer);
      otpState.isCountingDown = false;
      otpState.buttonText = "發送驗證碼";
    }
  }, 1000);
};
</script>
