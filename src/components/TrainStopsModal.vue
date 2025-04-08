<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            車次 {{ trainNumber }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card p-3">
            <Timeline :value="events">
              <template #opposite="slotProps">
                <small
                  class="me-3 text-surface-500 dark:text-surface-400"
                  :class="{
                    'text-primary fw-bold': slotProps.item.isTerminalStation,
                  }"
                  >{{ slotProps.item.departureTime }}</small
                >
              </template>
              <template #content="slotProps">
                <span
                  class="ms-3"
                  :class="{ 'fw-bold': slotProps.item.isTerminalStation }"
                >
                  {{ slotProps.item.stationName }}
                  <span
                    v-if="slotProps.item.isDepartureStation"
                    class="badge bg-primary ms-1"
                    >起點</span
                  >
                  <span
                    v-if="slotProps.item.isArrivalStation"
                    class="badge bg-primary ms-1"
                    >終點</span
                  >
                </span>
              </template>
            </Timeline>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useModal } from "@/composable/useModalControl";
import Timeline from "primevue/timeline";
import { defineExpose, ref } from "vue";

const { modalRef, showModal, hideModl } = useModal();

const events = ref([]);
const trainNumber = ref("");

defineExpose({
  showModal,
  hideModl,
  events,
  trainNumber,
});
</script>
