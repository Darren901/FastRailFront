import { OrderService } from "@/services/order-service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("order", () => {
  const order = ref({});
  const paidOrders = ref([]);
  const pendingOrders = ref([]);
  const ticketStatus = ref("PAID");

  const createOrder = async (data) => {
    try {
      const res = await OrderService.createOrder(data);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const getOrderByNumber = async (orderNumber) => {
    try {
      const res = await OrderService.getOrderByNumber(orderNumber);
      order.value = res.data;
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const getOrdersByUserId = async () => {
    try {
      const res = await OrderService.getOrderByUserId();

      paidOrders.value = res.data.filter((order) => {
        return order.orderStatus === "PAID";
      });
      pendingOrders.value = res.data.filter((order) => {
        return order.orderStatus === "PENDING";
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const payOrder = async (orderNumber, twId) => {
    try {
      const res = await OrderService.payOrder(orderNumber, twId);
      await getOrdersByUserId();
      await getOrderByNumber(res.data.orderNumber);
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    order,
    createOrder,
    getOrderByNumber,
    getOrdersByUserId,
    paidOrders,
    pendingOrders,
    payOrder,
    ticketStatus,
  };
});
