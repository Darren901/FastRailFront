<template>
  <BackstageBannerTop :title="'權限管理'"></BackstageBannerTop>
  <div class="my-2 d-flex">
    <h4 class="me-auto text-dark">權限管理</h4>
    <button class="btn btn-accent text-light ms-auto" @click="handleOpenModal">
      新增
    </button>
  </div>
  <EasyDataTable
    buttons-pagination
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    :headers="headers"
    :items="items"
  >
    <template #item-actions="item">
      <button class="btn btn-sm btn-success me-1 text-light">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-danger text-light">
        <i class="bi bi-archive"></i>
      </button>
    </template>
  </EasyDataTable>

  <AddAdminUserModal
    ref="createModal"
    @admin-data="handleAddAdmin"
  ></AddAdminUserModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAdminUsersStore } from "@/stores/adminUsersStore";
import { AlertModal } from "@/composable/alert-modal";
import BackstageBannerTop from "@/components/BackstageBannerTop.vue";
import AddAdminUserModal from "@/components/AddAdminUserModal.vue";

const query = ref({
  roleCode: "",
  startDate: "",
  endDate: "",
  pageNumber: 1,
});
const headers = ref([
  { text: "管理員帳號", value: "account" },
  { text: "群組代號", value: "role" },
  { text: "創建時間", value: "createdAt" },
  { text: "操作", value: "actions" },
]);
const items = ref([]);
const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
});

const createModal = ref(null);

const adminUsersStore = useAdminUsersStore();

const getData = async () => {
  try {
    query.value.pageNumber = serverOptions.value.page;
    const res = await adminUsersStore.findByCondition(query.value);
    items.value = res.body.content;
    serverItemsLength.value = res.body.totalElements;
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};

const handleAddAdmin = async (data) => {
  try {
    const res = await adminUsersStore.addAdminUser(data);
    AlertModal.showToast("success", res.message);
    createModal.value.hideModal();
    getData();
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};

const handleOpenModal = () => {
  createModal.value.showModal();
};

getData();

watch(
  serverOptions,
  (value) => {
    getData();
  },
  { deep: true }
);
</script>
