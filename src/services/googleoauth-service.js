import axios from "axios";
const API_URL = `${import.meta.env.VITE_API}/api/google`;

export const GoogleService = {
  login() {
    return axios.get(`${API_URL}/login`);
  },
};
