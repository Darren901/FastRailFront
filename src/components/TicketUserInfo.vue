<template>
  <div class="d-flex justify-content-center">
    <div class="card shadow p-3" style="width: 850px">
      <div class="card-body">
        <div class="card-title d-flex align-items-center">
          <h5>取票人資訊</h5>
        </div>
        <form class="row g-3">
          <div class="col-12">
            <label for="inputEmail4" class="form-label"
              >取票識別碼(國民身分證)<span style="color: orangered">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="inputEmail4"
              placeholder="取票時請依輸入之號碼出示證件"
              v-model="userInfo.twId"
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">手機號碼</label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              placeholder="請輸入手機號碼"
              v-model="userInfo.phone"
            />
            <small class="text-muted"
              >填寫台灣手機號碼，可收取訂位及付款資訊簡訊</small
            >
          </div>
          <div class="col-md-6">
            <label for="inputPassword5" class="form-label">電子郵件</label>
            <input
              type="email"
              class="form-control"
              id="inputPassword5"
              placeholder="your@email.com"
              v-model="userInfo.email"
            />
            <small class="text-muted"
              >填寫電子郵件，可收取訂位及付款資訊確認信</small
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const userInfo = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>
