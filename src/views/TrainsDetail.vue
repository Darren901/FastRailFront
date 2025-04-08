<template>
  <Stepper></Stepper>
  <div class="d-flex justify-content-center my-4">
    <div class="card shadow" style="width: 850px">
      <div class="card-body">
        <h5 class="card-title mt-3">
          <span v-if="searchParams.depStation > searchParams.arrStation"
            >去程</span
          >
          <span v-else>回程</span>： ({{ trainsStore.departureStationName }} →
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
                <div class="d-flex align-items-center text-muted">
                  <div
                    v-if="train.trainType === 'EXPRESS'"
                    class="thsr-fastest-route me-3"
                  >
                    <div class="thsr-badge-glow"></div>
                    <i class="bi bi-lightning-charge-fill"></i>
                    <span>最短時程</span>
                  </div>
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
import { computed, ref, onMounted } from "vue";
import { useTrainsStore } from "@/stores/trainsStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import TicketPreview from "@/components/TicketPreview.vue";
import Stepper from "@/components/Stepper.vue";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push("/");
  }
});

const trainsStore = useTrainsStore();
const { searchParams } = trainsStore;
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

  // 如果結果為負數，表示跨越午夜，加上24小時(1440分鐘)
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60; // 加上24小時的分鐘數
  }

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

<style scoped>
.thsr-fastest-route {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: #db5009;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  overflow: hidden;
  z-index: 1;
}

.thsr-fastest-route i {
  font-size: 0.85rem;
}

.thsr-badge-glow {
  position: absolute;
  top: 0;
  left: -50%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  z-index: 0;
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    left: -50%;
  }
  100% {
    left: 150%;
  }
}
</style>
