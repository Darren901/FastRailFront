<template>
  <div v-if="props.selectedTrain" class="d-flex justify-content-center">
    <div class="card shadow p-3" style="width: 850px">
      <div class="card-body">
        <div
          class="card-title d-flex justify-content-between align-items-center mt-3"
        >
          <h5>訂位明細</h5>
          <RouterLink to="/" class="text-decoration-none"
            ><i class="bi bi-search me-2"></i>重新查詢</RouterLink
          >
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="text-muted">
                    <span class="badge bg-black me-1 fs-6 px-1">去程</span
                    >{{ trainInfo.trainDate }}
                  </p>
                  <div class="d-flex">
                    <i class="bi bi-train-front me-1"></i>
                    <span>{{ trainInfo.trainNumber }}</span>
                  </div>
                </div>
                <div class="row align-items-center">
                  <div class="col">
                    <h5 class="mb-0">
                      {{ trainInfo.departureTime }}
                    </h5>
                    <h6>{{ trainStore.departureStationName }}</h6>
                  </div>
                  <div class="col"><hr /></div>
                  <div class="col text-muted small">
                    <i class="bi bi-clock me-1"></i>
                    <span>{{ trainInfo.durationTime }}</span>
                  </div>
                  <div class="col"><hr /></div>
                  <div class="col" style="text-align: end">
                    <h5 class="mb-0">{{ trainInfo.arrivalTime }}</h5>
                    <h6>{{ trainStore.arrivalStationName }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column" style="min-height: 100%">
            <div class="d-flex justify-content-between mt-auto">
              <div>
                <p class="text-muted small mb-0">車廂</p>
                <p class="text-muted small mb-0">票數</p>
              </div>
              <div>
                <p class="text-muted small mb-0">標準車廂</p>
                <p class="text-muted small mb-0">全票 1 張</p>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary text-light w-100 mt-5 py-3">
          確認車次
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTrainsStore } from "@/stores/trainsStore";
import { defineProps, computed } from "vue";

const trainStore = useTrainsStore();

const props = defineProps({
  selectedTrain: {
    type: [Object, String],
    required: true,
  },
});

const trainInfo = computed(() => {
  if (!props.selectedTrain) return {};

  return {
    departureTime: props.selectedTrain.departureTime || "",
    arrivalTime: props.selectedTrain.arrivalTime || "",
    durationTime: props.selectedTrain.durationTime || "",
    trainDate: formatTrainDate(props.selectedTrain.trainDate),
    trainNumber: props.selectedTrain.trainNumber,
  };
});

const formatTrainDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date?.split("-");
  return `${parseInt(month)}/${parseInt(day)}`;
};
</script>
