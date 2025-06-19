<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-accent text-light">
          <h5 class="modal-title" id="exampleModalLabel">新增車站</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="input-1"
              >車站代碼 <span style="color: orangered">*</span></label
            >
            <input
              class="form-control"
              id="input-1"
              type="text"
              placeholder="請輸入車站代碼"
              v-model="stationData.stationCode"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="input-2"
              >車站名稱 <span style="color: orangered">*</span></label
            >
            <input
              class="form-control"
              id="input-2"
              type="text"
              placeholder="請輸入車站名稱"
              v-model="stationData.stationName"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger text-light"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            @click="$emit('station-data', stationData)"
            type="button"
            class="btn btn-accent text-light"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, ref } from "vue";
import { useModal } from "@/composable/useModalControl";

const { modalRef, showModal, hideModal } = useModal();
defineExpose({
  showModal,
  hideModal,
});

const stationData = ref({
  stationCode: "",
  stationName: "",
});
</script>
