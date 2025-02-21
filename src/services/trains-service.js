import axios from "axios";
import { TokenService } from "./token-service";
const API_URL = `${import.meta.env.VITE_API}/api/trains`;

export const TrainsService = {
  findTrains(data) {
    return axios.get(`${API_URL}/trains`, {
      params: data,
      headers: {
        Authorization: TokenService.getToken(),
      },
    });
  },
  findTrainsByTrainNumber(data) {
    return axios.get(`${API_URL}/trains/byNumberAndRoute`, {
      params: data,
      headers: {
        Authorization: TokenService.getToken(),
      },
    });
  },
};
