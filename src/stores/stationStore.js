import { StationService } from "@/services/station-service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStationStore = defineStore("station", () => {
  const stations = ref([]);

  const getStations = async () => {
    try {
      const res = await StationService.getAllStations();
      console.log(res.data);
      stations.value = res.data;
    } catch (e) {
      throw e;
    }
  };

  return {
    getStations,
    stations,
  };
});
