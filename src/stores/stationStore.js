import { StationService } from "@/services/station-service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStationStore = defineStore("station", () => {
  const stations = ref([]);

  const getStations = async () => {
    try {
      const res = await StationService.getAllStations();
      stations.value = res.data;
    } catch (e) {
      throw e;
    }
  };

  const getStationsByPage = async (pageNumber) => {
    try {
      const res = await StationService.getStationByPage(pageNumber);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const addStation = async (data) => {
    try {
      const res = await StationService.addStation(data);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deleteStation = async (id) => {
    try {
      const res = await StationService.deleteStation(id);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return {
    getStations,
    stations,
    getStationsByPage,
    addStation,
    deleteStation,
  };
});
