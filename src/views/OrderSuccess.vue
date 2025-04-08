<template>
  <Stepper :current-page="'order'"></Stepper>
  <Ticket :order="orderStore.order"></Ticket>
  <div class="container d-flex justify-content-center">
    <div class="d-flex justify-content-around w-100" style="max-width: 800px">
      <RouterLink to="/" class="btn btn-primary w-25 py-3 text-light">回到首頁</RouterLink to="/">
      <RouterLink to="/my-tickets" class="btn btn-secondary w-25 py-3 text-light">我的車票</RouterLink to="/">
    </div>
  </div>
</template>
<script setup>
import Stepper from "@/components/Stepper.vue";
import Ticket from "@/components/Ticket.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute()
const orderStore = useOrderStore();
const getOrder = async () => {
  try {
    await orderStore.getOrderByNumber(route.params.orderNumber);
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "取得車票發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    router.push("/")
  }
};

getOrder();
</script>
