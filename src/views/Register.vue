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
              isCountingDown ? 'btn-primary text-light' : 'btn-outline-primary',
            ]"
            @click="handleSendOtp"
            :disabled="isCountingDown || showOtpSpinner"
          >
            <span style="text-wrap: nowrap"
              >{{ buttonText }}
              <div
                v-if="showOtpSpinner"
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const register = reactive({
  email: "",
  password: "",
  name: "",
  twId: "",
  phone: "",
  otp: "",
});

const isCountingDown = ref(false);
const countdown = ref(10); // 10秒倒計時
const buttonText = ref("發送驗證碼");
const showOtpSpinner = ref(false);

const userStore = useUserStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    const success = await userStore.register(register);
    if (success) {
      router.push("/login");
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
    }
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "註冊失敗",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};

const handleSendOtp = async () => {
  if (isCountingDown.value) return;

  if (!register.email) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "請先填寫Email",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return;
  }

  try {
    showOtpSpinner.value = true;
    const res = await userStore.sendOtp(register.email);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      iconColor: "black",
      title: res.data.message,
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    startCountdown();
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "傳送驗證碼發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  } finally {
    showOtpSpinner.value = false;
  }
};

const startCountdown = () => {
  isCountingDown.value = true;
  countdown.value = 10;
  buttonText.value = `已發送(${countdown.value})`;

  const timer = setInterval(() => {
    countdown.value--;
    buttonText.value = `已發送(${countdown.value})`;

    if (countdown.value <= 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      buttonText.value = "發送驗證碼";
    }
  }, 1000);
};
</script>
