<template>
  <div
    class="container bg-light position-relative"
    style="min-height: 450px; margin-top: -10rem; z-index: 1"
  >
    <div class="d-flex pt-3 px-3">
      <h3 class="text-primary">預定高鐵車票</h3>
      <h5 class="mt-2 ms-5" style="letter-spacing: 5px">
        預見美好，從這裡出發！
      </h5>
    </div>
    <div class="d-flex justify-content-end mt-3 px-3">
      <span class="me-3">搜尋方式</span>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="time"
          v-model="searchMethod"
          checked
        />
        <label class="form-check-label" for="inlineRadio1">按時間</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio2"
          value="trains"
          v-model="searchMethod"
        />
        <label class="form-check-label" for="inlineRadio2">按車次</label>
      </div>
    </div>

    <div class="container my-3">
      <div class="row g-3 mb-3">
        <!-- 出發站 -->
        <div class="col-md-2">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-geo-alt fs-4 text-primary"></i>
              <div>
                <label class="form-label text-muted small">出發站</label>
                <select class="form-select" v-model="searchStation.depStation">
                  <option selected>請選擇...</option>
                  <option
                    v-for="station in stationStore.stations"
                    :key="station.id"
                    :value="station.id"
                  >
                    {{ station.stationName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 箭頭 -->
        <div class="col-md-auto d-flex align-items-center">
          <i class="bi bi-arrow-right"></i>
        </div>

        <!-- 抵達站 -->
        <div class="col-md-2">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-geo-alt fs-4 text-primary"></i>
              <div>
                <label class="form-label text-muted small">抵達站</label>
                <select class="form-select" v-model="searchStation.arrStation">
                  <option selected>請選擇...</option>
                  <option
                    v-for="station in stationStore.stations"
                    :key="station.id"
                    :value="station.id"
                  >
                    {{ station.stationName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 出發日期 -->
        <div class="col-md-3">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-calendar-date text-primary fs-4"></i>
              <div class="flex-grow-1">
                <label class="form-label text-muted small mb-1">出發日期</label>
                <input
                  type="date"
                  class="form-control"
                  name="departure-date"
                  id="departure-date"
                  min="2025-02-16"
                  max="2025-03-16"
                  v-model="searchStation.trainDate"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 出發時間 -->
        <div v-if="searchMethod === 'time'" class="col-md-3">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-stopwatch fs-4 text-primary"></i>
              <div>
                <label class="form-label text-muted small">出發時間</label>
                <select class="form-select" v-model="searchStation.depTime">
                  <option selected>請選擇...</option>
                  <option>06:00</option>
                  <option>07:00</option>
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                  <option>13:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                  <option>22:00</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 按車次查詢 -->
        <div v-else class="col-md-3">
          <div class="border rounded p-3">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-train-front fs-4 text-primary"></i>
              <div>
                <label class="form-label text-muted small">出發車次</label>
                <input
                  class="form-control border-0 bg-light"
                  type="text"
                  placeholder="請輸入車次號碼"
                  v-model="searchStation.trainNumber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 票種選擇 -->
      <div class="row g-2">
        <!-- 全票 -->
        <div class="col">
          <div class="border rounded p-3">
            <label class="form-label text-muted small">全票</label>
            <select class="form-select">
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <!-- 孩童票 -->
        <div class="col">
          <div class="border rounded p-3">
            <label class="form-label text-muted small">孩童票(6-11)</label>
            <select class="form-select">
              <option value="0" selected>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <!-- 愛心票 -->
        <div class="col">
          <div class="border rounded p-3">
            <label class="form-label text-muted small">愛心票</label>
            <select class="form-select">
              <option value="0" selected>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <!-- 敬老票 -->
        <div class="col">
          <div class="border rounded p-3">
            <label class="form-label text-muted small">敬老票(65+)</label>
            <select class="form-select">
              <option value="0" selected>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <!-- 大學生票 -->
        <div class="col">
          <div class="border rounded p-3">
            <label class="form-label text-muted small">大學生票</label>
            <select class="form-select">
              <option value="0" selected>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button
        class="btn btn-primary text-light rounded-1"
        style="padding: 1rem 8rem"
        @click="handleSearch"
      >
        開始查詢
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStationStore } from "@/stores/stationStore";
import { useTrainsStore } from "@/stores/trainsStore";
import Swal from "sweetalert2";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const stationStore = useStationStore();
const trainsStore = useTrainsStore();
const router = useRouter();

const fetchStations = async () => {
  try {
    await stationStore.getStations();
  } catch (e) {
    console.error("Failed to fetch stations:", e);
  }
};

fetchStations();

const searchStation = reactive(trainsStore.searchParams);
const searchMethod = ref(trainsStore.searchParams.searchMethod);

const updateStationNames = () => {
  if (searchStation.depStation > 0) {
    const depStation = stationStore.stations.find(
      (s) => s.id === searchStation.depStation
    );
    trainsStore.departureStationName = depStation?.stationName || "";
  }

  if (searchStation.arrStation > 0) {
    const arrStation = stationStore.stations.find(
      (s) => s.id === searchStation.arrStation
    );
    trainsStore.arrivalStationName = arrStation?.stationName || "";
  }
};

const handleSearch = async () => {
  trainsStore.setSearchParams({
    ...searchStation,
    searchMethod: searchMethod.value,
  });

  updateStationNames();

  try {
    const results = await trainsStore.findTrains();
    console.log(results);
    if (results && results.length > 0) {
      router.push("/search-results");
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "沒有符合的車次",
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
      title: e.response.data.message || "查詢時發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
