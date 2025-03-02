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
              <div class="d-flex align-items-center mb-2">
                <span class="badge bg-dark me-2">
                  {{ props.order.tripType }}
                </span>
                <p class="mb-0 text-muted">
                  {{ formatTrainDate(props.order.trainDate).year }}/{{
                    formatTrainDate(props.order.trainDate).month
                  }}/{{ formatTrainDate(props.order.trainDate).day }}
                </p>
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
                  @click="$emit('open-modal', props.order.orderNumber)"
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
</template>

<script setup>
import { defineProps } from "vue";

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
