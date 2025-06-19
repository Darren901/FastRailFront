<template>
  <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
    <ol class="breadcrumb fw-bold">
      <li class="breadcrumb-item">
        <RouterLink to="/backstage/home" style="text-decoration: none"
          >首頁</RouterLink
        >
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ props.title }}
      </li>
    </ol>
  </nav>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
