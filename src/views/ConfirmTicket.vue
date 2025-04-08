<template>
  <Stepper :current-page="'confirm'"></Stepper>
  <div
    v-if="trainStore.selectedTrain"
    class="d-flex justify-content-center my-4"
  >
    <div class="card shadow p-3" style="width: 850px">
      <div class="card-body">
        <div
          class="card-title d-flex justify-content-between align-items-center"
        >
          <h5>訂位明細</h5>
          <RouterLink to="/search-results" class="text-decoration-none"
            ><i class="bi bi-recycle me-2"></i>回上一頁</RouterLink
          >
        </div>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="text-muted">
                    <span class="badge bg-black me-1 fs-6 px-1">{{
                      selectedTrain.tripType
                    }}</span
                    >{{ selectedTrain.trainDate }}
                  </p>
                  <div class="d-flex">
                    <i class="bi bi-train-front me-1"></i>
                    <span>{{ selectedTrain.trainNumber }}</span>
                  </div>
                </div>
                <div class="row align-items-center">
                  <div class="col">
                    <h5 class="mb-0">
                      {{ selectedTrain.depTime }}
                    </h5>
                    <h6>{{ selectedTrain.depStation }}</h6>
                  </div>
                  <div class="col"><hr /></div>
                  <div class="col text-muted small">
                    <i class="bi bi-clock me-1"></i>
                    <span>{{ selectedTrain.durationTime }}</span>
                  </div>
                  <div class="col"><hr /></div>
                  <div class="col" style="text-align: end">
                    <h5 class="mb-0">{{ selectedTrain.arrTime }}</h5>
                    <h6>{{ selectedTrain.arrStation }}</h6>
                  </div>
                </div>
                <div
                  class="accordion accordion-flush mt-1 border-top"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item mt-2">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button
                        class="accordion-button collapsed p-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        <a class="small text-decoration-none">詳細內容</a>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="p-2">
                        <div class="d-flex flex-column">
                          <div class="d-flex justify-content-between my-3">
                            <span class="text-muted small">全票x1</span>
                            <span>-------------------------</span>
                            <span class="text-muted small"
                              >TWD {{ selectedTrain.price }}</span
                            >
                          </div>
                          <div class="d-flex justify-content-between">
                            <span class="text-muted small">小計</span>
                            <span class="text-muted small"
                              >TWD {{ selectedTrain.price }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
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
            <hr />
            <div class="d-flex justify-content-between">
              <span class="text-muted">總票價</span>
              <span class="text-primary fs-5 fw-bold"
                >TWD {{ selectedTrain.price }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TicketUserInfo v-model="userInfo"></TicketUserInfo>
  <div class="d-flex justify-content-center mt-4">
    <div class="card shadow p-3" style="width: 850px">
      <div class="card-body">
        <label
          class="w-100 bg-secondary p-3 bg-opacity-25"
          style="cursor: pointer"
          for="check-input"
        >
          <div class="d-flex align-items-center small">
            <div class="form-check me-3">
              <input
                class="form-check-input"
                type="checkbox"
                name="trainOption"
                id="check-input"
              />
              <span
                >我已明確了解
                <a href="#">個人資料保護政策及顧客個人資料保護權益事項</a
                >，並且同意遵守所有規定及提供個人所需資料。</span
              >
            </div>
          </div>
        </label>
        <button
          @click="handleConfirm"
          class="btn btn-primary text-light w-100 mt-4 py-3"
        >
          完成訂位
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Stepper from "@/components/Stepper.vue";
import TicketUserInfo from "@/components/TicketUserInfo.vue";
import { useTrainsStore } from "@/stores/trainsStore";
import { useOrderStore } from "@/stores/orderStore";
import { reactive, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const orderStore = useOrderStore();
const trainStore = useTrainsStore();
const { selectedTrain } = trainStore;

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push("/");
  }
});

const userInfo = reactive({
  twId: "",
  phone: "",
  email: "",
});

const handleConfirm = async () => {
  try {
    const data = await orderStore.createOrder({
      userId: localStorage.getItem("userId"),
      trainNumber: selectedTrain.trainNumber,
      departureStationId: trainStore.searchParams.depStation,
      arrivalStationId: trainStore.searchParams.arrStation,
      departureTime: selectedTrain.depTime,
      arrivalTime: selectedTrain.arrTime,
      twId: userInfo.twId,
    });
    if (data) {
      router.push(`/order/${data.orderNumber}`);
    }
  } catch (e) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: e.response.data.message || "訂位發生錯誤",
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
