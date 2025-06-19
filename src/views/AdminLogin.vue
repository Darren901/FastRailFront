<template>
  <div
    class="container d-flex justify-content-center align-items-center"
    style="min-height: 75vh"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style="width: 300px"
    >
      <h3>管理員登入</h3>
      <div class="mb-3 w-100">
        <label for="account" class="form-label">帳號</label>
        <input
          type="text"
          class="form-control"
          id="account"
          placeholder="請輸入帳號"
          v-model="login.account"
        />
      </div>
      <div class="mb-3 w-100">
        <label for="password" class="form-label">密碼</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="請輸入密碼"
          v-model="login.password"
        />
      </div>
      <button class="btn btn-dark text-light mt-3 w-100" @click="handleLogin">
        登入
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminUsersStore } from "@/stores/adminUsersStore";
import { useRouter } from "vue-router";
import { AlertModal } from "@/composable/alert-modal";

const login = ref({
  account: "",
  password: "",
});

const adminUsersStore = useAdminUsersStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await adminUsersStore.login(login.value);
    if (res.adminUserId) {
      console.log(res.adminUserId);
      updateAdminUserData(res.adminUserId);
    }
    AlertModal.showToast("success", res.message);
    router.push("/backstage/home");
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};

const updateAdminUserData = async (id) => {
  try {
    const res = await adminUsersStore.getAdminUserData(id);
    await adminUsersStore.getSelectEnum();
    adminUsersStore.adminUserData.id = res.body.id;
    adminUsersStore.adminUserData.account = res.body.account;
    const role = adminUsersStore.selectEnum.find(
      (item) => item.code === res.body.role
    );
    adminUsersStore.adminUserData.role = role.name;
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};
</script>
