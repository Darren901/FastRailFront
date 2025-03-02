import { UserService } from "@/services/user-service";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || null);
  const userId = ref(localStorage.getItem("userId") || null);
  const isLoggedIn = computed(() => !!token.value);

  const login = async (email, password) => {
    try {
      const res = await UserService.login(email, password);
      console.log(res.data);
      token.value = res.data.token;
      userId.value = res.data.userId;
      localStorage.setItem("token", token.value);
      localStorage.setItem("userId", userId.value);
      return true;
    } catch (e) {
      throw e;
    }
  };

  const register = async (data) => {
    try {
      const res = await UserService.register(data);
      console.log(res.data);
      return true;
    } catch (e) {
      throw e;
    }
  };

  const sendOtp = async (email) => {
    try {
      const res = await UserService.sendOtp(email);
      return res;
    } catch (e) {
      throw e;
    }
  };

  const logout = () => {
    token.value = null;
    userId.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return {
    token,
    userId,
    login,
    register,
    isLoggedIn,
    logout,
    sendOtp,
  };
});
