<template>
  <BackstageBannerTop :title="'車站管理'"></BackstageBannerTop>
  <div class="my-2 d-flex">
    <h4 class="me-auto text-dark">車站管理</h4>
    <button
      class="btn btn-accent text-light ms-auto"
      @click="handleOpenAddModal"
    >
      新增
    </button>
  </div>
  <EasyDataTable
    buttons-pagination
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    :headers="headers"
    :items="items"
    :key="reRender"
  >
    <template #item-actions="item">
      <button class="btn btn-sm btn-success me-1 text-light">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button
        class="btn btn-sm btn-danger text-light"
        @click="handleDeleteStation(item.id)"
      >
        <i class="bi bi-archive"></i>
      </button>
    </template>
  </EasyDataTable>
  <AddStationModal
    ref="createModalRef"
    @station-data="handleAddStation"
  ></AddStationModal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStationStore } from "@/stores/stationStore";
import { AlertModal } from "@/composable/alert-modal";
import BackstageBannerTop from "@/components/BackstageBannerTop.vue";
import AddStationModal from "@/components/AddStationModal.vue";
import Swal from "sweetalert2";

const headers = ref([
  { text: "編號", value: "id" },
  { text: "車站代碼", value: "stationCode" },
  { text: "車站名稱", value: "stationName" },
  { text: "操作", value: "actions" },
]);
const items = ref([]);
const serverItemsLength = ref(0);
const serverOptions = ref({
  page: 1,
  rowsPerPage: 10,
});
const reRender = ref(0);

const stationStore = useStationStore();

const createModalRef = ref(null);
const handleOpenAddModal = () => {
  createModalRef.value.showModal();
};

const handleAddStation = async (data) => {
  try {
    await stationStore.addStation(data);
    AlertModal.showToast("success", "新增成功");
    createModalRef.value.hideModal();
    getData();
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
};

const handleDeleteStation = (id) => {
  Swal.fire({
    title: "是否刪除該筆車站資料?",
    text: "您將無法復原此操作！",
    icon: "warning",
    iconColor: "#5696fd",
    showCancelButton: true,
    confirmButtonColor: "#5696fd",
    cancelButtonColor: "#ff4d4f",
    confirmButtonText: "確認",
    cancelButtonText: "取消",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await stationStore.deleteStation(id);
        getData();
        AlertModal.showToast("success", "刪除成功");
      } catch (e) {
        AlertModal.showToast("error", e.response.data.error);
      }
    }
  });
};

const getData = async () => {
  try {
    const res = await stationStore.getStationsByPage(serverOptions.value.page);
    items.value = res.body.content;
    serverItemsLength.value = res.body.totalElements;
    reRender.value++;
  } catch (e) {
    AlertModal.showToast("error", e.response.data.error);
  }
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
