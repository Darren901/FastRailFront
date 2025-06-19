import axios from "./axios-instance";
import { TokenService } from "./token-service";
const API_URL = `${import.meta.env.VITE_API}/api/stations`;
const BACK_API_URL = `${import.meta.env.VITE_API}/api/backstage/stations`;

export const StationService = {
  getAllStations() {
    return axios.get(API_URL, {
      headers: {
        Authorization: TokenService.getToken(),
      },
    });
  },
  getStationByPage(pageNumber) {
    return axios.get(`${BACK_API_URL}/${pageNumber}`);
  },
  addStation(data) {
    return axios.post(`${BACK_API_URL}`, data);
  },
  deleteStation(id) {
    return axios.delete(`${BACK_API_URL}/${id}`);
  },
};
