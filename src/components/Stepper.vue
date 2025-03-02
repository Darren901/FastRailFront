<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex w-50 mt-3 small">
      <span>1. 查詢車次</span>
      <span class="text-muted mx-3">—</span>
      <span>2. 選擇車次</span>
      <span class="text-muted mx-3">—</span>
      <span
        :class="{
          'text-muted': !['confirm', 'order'].includes(props.currentPage),
        }"
        >3. 取票資訊</span
      >
      <span class="text-muted mx-3">—</span>
      <span :class="{ 'text-muted': props.currentPage !== 'order' }"
        >4. 完成訂位</span
      >
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  currentPage: {
    type: String,
  },
});
</script>
