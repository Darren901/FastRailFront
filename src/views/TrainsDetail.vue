<template>
  <Stepper></Stepper>
  <div class="d-flex justify-content-center mt-4 mb-4">
    <div class="card shadow" style="width: 850px">
      <div class="card-body">
        <h5 class="card-title mt-3">
          去程： ({{ trainsStore.departureStationName }} →
          {{ trainsStore.arrivalStationName }})
        </h5>
        <p class="card-subtitle text-muted mt-3 mb-2">
          {{ formattedTrainDate }}
        </p>
        <div
          v-for="train in trainsStore.searchResults"
          :key="train.trainNumber"
          class="list-group-item p-3 border rounded mb-2"
        >
          <label
            class="w-100 m-0"
            style="cursor: pointer"
            :for="train.trainNumber"
          >
            <div class="d-flex align-items-center">
              <div class="form-check me-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="trainOption"
                  :id="train.trainNumber"
                  v-model="selectedTrain"
                  :value="{
                    ...train,
                    departureTime: getTrainTimes(train).departureTime,
                    arrivalTime: getTrainTimes(train).arrivalTime,
                    durationTime: getTrainTimes(train).duration,
                  }"
                />
              </div>
              <div
                class="d-flex justify-content-between align-items-center w-100"
              >
                <div class="d-flex align-items-center">
                  <div class="fs-5" style="min-width: 55px">
                    {{ getTrainTimes(train).departureTime }}
                  </div>
                  <div class="mx-3">→</div>
                  <div class="fs-5">
                    {{ getTrainTimes(train).arrivalTime }}
                  </div>
                </div>
                <div class="d-flex align-items-center text-primary">
                  <i class="bi bi-clock me-1"></i>
                  <span>{{ getTrainTimes(train).duration }}</span>
                  <div class="mx-3">|</div>
                  <i class="bi bi-train-front me-1"></i>
                  <span>{{ train.trainNumber }}</span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
  <TicketPreview :selected-train="selectedTrain"></TicketPreview>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTrainsStore } from "@/stores/trainsStore";
import TicketPreview from "@/components/TicketPreview.vue";
import Stepper from "@/components/Stepper.vue";

const trainsStore = useTrainsStore();
const selectedTrain = ref("");

const formattedTrainDate = computed(() => {
  const date = new Date(trainsStore.searchParams.trainDate);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  const weekday = weekdays[date.getDay()];
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} (星期${weekday})`;
});

const calculateDuration = (departure, arrival) => {
  const [depHours, depMinutes] = departure.split(":").map(Number);
  const [arrHours, arrMinutes] = arrival.split(":").map(Number);

  let durationMinutes =
    arrHours * 60 + arrMinutes - (depHours * 60 + depMinutes);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

const getTrainTimes = (train) => {
  const departureStop = train.trainStops.find(
    (stop) => stop.stationName === trainsStore.departureStationName
  );
  const arrivalStop = train.trainStops.find(
    (stop) => stop.stationName === trainsStore.arrivalStationName
  );

  const departureTime = departureStop?.departureTime?.substring(0, 5);
  const arrivalTime = arrivalStop?.arrivalTime?.substring(0, 5);

  return {
    departureTime,
    arrivalTime,
    duration: calculateDuration(departureTime, arrivalTime),
  };
};
</script>
