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
          <h5 class="modal-title" id="exampleModalLabel">新增管理員</h5>
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
              >管理員帳號 <span style="color: orangered">*</span></label
            >
            <input
              class="form-control"
              id="input-1"
              type="text"
              placeholder="請輸入管理員帳號"
              v-model="adminUserData.account"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="input-2"
              >管理員密碼 <span style="color: orangered">*</span></label
            >
            <input
              class="form-control"
              id="input-2"
              type="password"
              placeholder="請輸入管理員密碼"
              v-model="adminUserData.password"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="input-3"
              >管理員權限 <span style="color: orangered">*</span></label
            >
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="adminUserData.role"
            >
              <option selected disabled>請選擇權限</option>
              <option
                v-for="item in adminUsersStore.selectEnum"
                :key="item.code"
                :value="item.code"
              >
                {{ item.name }}
              </option>
            </select>
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
            @click="$emit('admin-data', adminUserData)"
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
import { defineExpose, ref, onMounted } from "vue";
import { useModal } from "@/composable/useModalControl";
import { useAdminUsersStore } from "@/stores/adminUsersStore";

const adminUsersStore = useAdminUsersStore();
const { modalRef, showModal, hideModal } = useModal();

const adminUserData = ref({
  account: "",
  password: "",
  role: "",
});

defineExpose({
  showModal,
  hideModal,
});

onMounted(async () => {
  await adminUsersStore.getSelectEnum();
});
</script>
