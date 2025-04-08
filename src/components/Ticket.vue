<template>
  <div v-if="props.order" class="container my-4">
    <div
      class="card mx-auto shadow"
      style="max-width: 800px; border-radius: 12px; overflow: hidden"
    >
      <div
        class="card-header d-flex justify-content-between align-items-center bg-primary text-white py-3"
      >
        <h5 class="mb-0">台灣高速鐵路電子車票</h5>
        <div class="d-flex align-items-center">
          <i class="bi bi-upc me-2"></i>
          <span class="fw-bold">票號 {{ props.order.orderNumber }}</span>
        </div>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <div class="border-bottom pb-3 mb-3">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <div class="d-flex">
                  <span class="badge bg-dark me-2">
                    {{ props.order.tripType }}
                  </span>
                  <p class="mb-0 text-muted">
                    {{ formatTrainDate(props.order.trainDate).year }}/{{
                      formatTrainDate(props.order.trainDate).month
                    }}/{{ formatTrainDate(props.order.trainDate).day }}
                  </p>
                </div>
                <span
                  class="text-primary fw-bold"
                  style="cursor: pointer"
                  @click="openStopsModal"
                  >停靠站</span
                >
              </div>

              <div class="d-flex align-items-center">
                <div>
                  <h4 class="mb-0">
                    {{ props.order.departureTime?.substring(0, 5) }}
                  </h4>
                  <h5>{{ props.order.departureStationName }}</h5>
                </div>
                <div class="mx-3 position-relative" style="width: 120px">
                  <hr class="w-100" />
                  <div
                    class="position-absolute top-0 start-50 translate-middle bg-white px-2"
                  >
                    <i class="bi bi-train-front text-primary"></i>
                  </div>
                </div>
                <div>
                  <h4 class="mb-0">
                    {{ props.order.arrivalTime?.substring(0, 5) }}
                  </h4>
                  <h5>{{ props.order.arrivalStationName }}</h5>
                </div>
                <div class="ms-auto me-2">
                  <i class="bi bi-qr-code" style="font-size: 75px"></i>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p class="text-muted mb-0">車次</p>
                <h5>{{ props.order.trainNumber }}</h5>
              </div>
              <div class="col-md-4">
                <p class="text-muted mb-0">車廂</p>
                <h5>{{ props.order.seatNumber?.substring(0, 2) }}</h5>
              </div>
              <div class="col-md-4">
                <p class="text-muted mb-0">座位</p>
                <h5>{{ props.order.seatNumber?.substring(2) }}</h5>
              </div>
            </div>
          </div>

          <div class="col-md-4 border-start ps-4">
            <div class="mb-3">
              <p class="text-muted mb-0">乘客</p>
              <h5>{{ props.order.userName }}</h5>
            </div>
            <div class="mb-3">
              <p class="text-muted mb-0">票種</p>
              <h5>全票</h5>
            </div>
            <div class="mb-3">
              <p class="text-muted mb-0">訂單狀態</p>
              <div class="d-flex">
                <h5 :class="statusColorFilter[props.order.orderStatus]">
                  {{ orderStatusFilter[props.order.orderStatus] }}
                </h5>
                <button
                  v-if="props.order.orderStatus === 'PENDING'"
                  class="btn btn-outline-primary btn-sm ms-3"
                  @click="openGetTicketModel"
                >
                  <span class="small">付款並取票</span>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <p class="text-muted mb-0">票價</p>
              <h5 class="text-primary fw-bold">
                TWD {{ props.order.ticketPrice }}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer bg-light text-center py-3">
        <p class="small text-muted mb-0">
          此電子票證等同實體車票，請妥善保存。現場驗票時，請出示身分證明文件。
        </p>
      </div>
    </div>
  </div>
  <TrainStopsModal ref="stopsRef"></TrainStopsModal>
  <GetTicketModal ref="ticketModal" @payOrder="handlePayOrder"></GetTicketModal>
</template>

<script setup>
import GetTicketModal from "@/components/GetTicketModal.vue";
import { defineProps, ref } from "vue";
import TrainStopsModal from "./TrainStopsModal.vue";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();

const ticketModal = ref(null);
const openGetTicketModel = () => {
  ticketModal.value.showModal();
};

const handlePayOrder = async (twId) => {
  try {
    const success = await orderStore.payOrder(props.order.orderNumber, twId);
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
      orderStore.ticketStatus = "PAID";
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

const stopsRef = ref();
const openStopsModal = () => {
  stopsRef.value.showModal();
  stopsRef.value.trainNumber = props.order.trainNumber;

  // 確保有trainStops數據
  if (!props.order.trainStops || props.order.trainStops.length === 0) {
    stopsRef.value.events = [];
    return;
  }

  // 找出起始站和終點站在trainStops數組中的索引
  const departureStationName = props.order.departureStationName;
  const arrivalStationName = props.order.arrivalStationName;

  const startIndex = props.order.trainStops.findIndex(
    (stop) => stop.stationName === departureStationName
  );

  const endIndex = props.order.trainStops.findIndex(
    (stop) => stop.stationName === arrivalStationName
  );

  // 如果找不到站點，則顯示全部（防錯處理）
  if (startIndex === -1 || endIndex === -1) {
    stopsRef.value.events = props.order.trainStops.map((stop) => ({
      stationName: stop.stationName,
      departureTime:
        stop.departureTime != null
          ? stop.departureTime
          : props.order.arrivalTime,
    }));
    return;
  }

  // 截取起始站到終點站之間的停靠站（包含起始站和終點站）
  const relevantStops = props.order.trainStops.slice(startIndex, endIndex + 1);

  stopsRef.value.events = relevantStops.map((stop) => ({
    stationName: stop.stationName,
    departureTime:
      stop.stationName != arrivalStationName
        ? stop.departureTime?.substring(0, 5)
        : stop.arrivalTime?.substring(0, 5),
    isTerminalStation:
      stop.stationName === departureStationName ||
      stop.stationName === arrivalStationName,
    isDepartureStation: stop.stationName === departureStationName,
    isArrivalStation: stop.stationName === arrivalStationName,
  }));
};

const orderStatusFilter = {
  PENDING: "待付款",
  PAID: "已付款",
  CANCELLED: "已取消",
};

const statusColorFilter = {
  PENDING: "text-accent",
  PAID: "text-success",
  CANCELLED: "text-danger",
};

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const formatTrainDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date?.split("-");
  return {
    year,
    month,
    day,
  };
};

const openModal = () => {};
</script>
