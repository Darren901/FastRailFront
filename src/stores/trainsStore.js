import { TrainsService } from "@/services/trains-service";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useTrainsStore = defineStore(
  "trains",
  () => {
    const searchParams = reactive({
      depStation: -1,
      arrStation: -1,
      trainDate: "",
      depTime: "",
      trainNumber: "",
      searchMethod: "time",
    });

    const selectedTrain = reactive({
      tripType: "",
      trainDate: "",
      trainNumber: "",
      depStation: "",
      arrStation: "",
      depTime: "",
      arrTime: "",
      durationTime: "",
      price: 0,
    });

    const searchResults = ref([]);
    const departureStationName = ref("");
    const arrivalStationName = ref("");

    const setSearchParams = (params) => {
      Object.assign(searchParams, params);
    };

    const findTrains = async () => {
      try {
        const params =
          searchParams.searchMethod === "time"
            ? {
                departureStationId: searchParams.depStation,
                arrivalStationId: searchParams.arrStation,
                trainDate: searchParams.trainDate,
                departureTime: searchParams.depTime,
              }
            : {
                departureStationId: searchParams.depStation,
                arrivalStationId: searchParams.arrStation,
                trainDate: searchParams.trainDate,
                trainNumber: searchParams.trainNumber,
              };

        const service =
          searchParams.searchMethod === "time"
            ? TrainsService.findTrains
            : TrainsService.findTrainsByTrainNumber;

        const res = await service(params);
        searchResults.value = res.data;
        return res.data;
      } catch (e) {
        throw e;
      }
    };

    return {
      searchParams,
      searchResults,
      departureStationName,
      arrivalStationName,
      setSearchParams,
      findTrains,
      selectedTrain,
    };
  },
  {
    persist: true,
  }
);
