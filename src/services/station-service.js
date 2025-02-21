import axios from "axios";
import { TokenService } from "./token-service";
const API_URL = `${import.meta.env.VITE_API}/api/stations`;

export const StationService = {
  getAllStations() {
    return axios.get(API_URL, {
      headers: {
        Authorization: TokenService.getToken(),
      },
    });
  },
};
