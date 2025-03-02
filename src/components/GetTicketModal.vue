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
        <div class="modal-header bg-primary text-light">
          <h5 class="modal-title" id="exampleModalLabel">付款並取票</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label class="form-label" for="input-1"
            >取票識別碼(身分證) <span style="color: orangered">*</span></label
          >
          <input
            class="form-control"
            id="input-1"
            type="text"
            placeholder="請輸入取票識別碼"
            v-model="twId"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            關閉
          </button>
          <button
            @click="$emit('pay-order', twId)"
            type="button"
            class="btn btn-success text-light"
          >
            確認付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModal } from "@/composable/useModalControl";
import { defineExpose, ref } from "vue";

const { modalRef, showModal, hideModal } = useModal();

const twId = ref("");

defineExpose({
  showModal,
  hideModal,
});
</script>
