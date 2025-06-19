import { defineStore } from "pinia";
import { AdminUsers } from "@/services/adminusers-service";
import { ref } from "vue";

export const useAdminUsersStore = defineStore(
  "adminUsers",
  () => {
    const selectEnum = ref([]);

    const adminUserData = ref({
      id: "",
      account: "",
      role: "",
    });

    const login = async (data) => {
      try {
        const res = await AdminUsers.login(data);
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    const logout = async (id) => {
      try {
        const res = await AdminUsers.logout(id);
        adminUserData.value = {};
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    const findByCondition = async (data) => {
      try {
        const res = await AdminUsers.findByCondition(data);
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    const addAdminUser = async (data) => {
      try {
        const res = await AdminUsers.addAdminUser(data);
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    const getAdminUserData = async (id) => {
      try {
        const res = await AdminUsers.getAdminUserData(id);
        return res.data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    const getSelectEnum = async () => {
      try {
        const res = await AdminUsers.getAdminEnum();
        selectEnum.value = res.data.selectEnum;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };

    return {
      login,
      findByCondition,
      addAdminUser,
      getAdminUserData,
      getSelectEnum,
      logout,
      adminUserData,
      selectEnum,
    };
  },
  {
    persist: {
      paths: ["adminUserData"],
    },
  }
);
