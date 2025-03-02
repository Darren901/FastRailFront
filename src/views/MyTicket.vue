<template>
  <div v-if="userStore.isLoggedIn" class="container">
    <h4 class="mt-5">我的車票</h4>
    <br />
    <div class="row">
      <div @click="orderStore.ticketStatus = 'PAID'" class="col text-center">
        <p
          :class="{ 'text-primary': orderStore.ticketStatus === 'PAID' }"
          class="mb-0 ticket-item"
          style="cursor: pointer"
        >
          已取票({{ orderStore.paidOrders.length }})
        </p>
      </div>
      <div
        @click="orderStore.ticketStatus = 'PENDING'"
        class="col text-center border-start border-primary"
      >
        <p
          :class="{ 'text-primary': orderStore.ticketStatus === 'PENDING' }"
          class="mb-0 ticket-item"
          style="cursor: pointer"
        >
          未付款({{ orderStore.pendingOrders.length }})
        </p>
      </div>
    </div>
    <hr class="text-primary" />
    <div
      v-if="orderStore.ticketStatus === 'PAID'"
      v-for="order in orderStore.paidOrders"
    >
      <Ticket :order="order" @open-modal="handleOpenModel"></Ticket>
    </div>
    <div v-else v-for="order in orderStore.pendingOrders">
      <Ticket :order="order" @open-modal="handleOpenModel"></Ticket>
    </div>
    <GetTicketModal
      ref="ticketModal"
      @payOrder="handlePayOrder"
    ></GetTicketModal>
  </div>
  <div v-else>
    <h2 class="d-flex justify-content-center text-muted mt-5">請先登入會員</h2>
  </div>
</template>

<script setup>
import GetTicketModal from "@/components/GetTicketModal.vue";
import Ticket from "@/components/Ticket.vue";
import { useOrderStore } from "@/stores/orderStore";
import { useUserStore } from "@/stores/userStore";
import { ref, watch } from "vue";

const orderStore = useOrderStore();
const userStore = useUserStore();

const getOrders = async () => {
  try {
    await orderStore.getOrdersByUserId();
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
  }
};

getOrders();

watch(
  () => orderStore.ticketStatus,
  () => getOrders()
);

const ticketModal = ref(null);
const currentOrderNumber = ref(null);
const handleOpenModel = (orderNumber) => {
  currentOrderNumber.value = orderNumber;
  ticketModal.value.showModal();
};

const handlePayOrder = async (twId) => {
  try {
    const success = await orderStore.payOrder(currentOrderNumber.value, twId);
    if (success) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        iconColor: "black",
        title: "付款成功",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "付款發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  } finally {
    ticketModal.value.hideModal();
  }
};
</script>

<style scoped>
.ticket-item {
  font-size: 18px;
  transition: all 0.2s ease;
}

.ticket-item:hover {
  color: #db5009;
}
</style>
