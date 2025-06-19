import axios from "./axios-instance";
const API_URL = `${import.meta.env.VITE_API}/api/google`;

export const GoogleService = {
  login() {
    return axios.get(`${API_URL}/login`);
  },
  completeRegistration: (data) => {
    return axios.post(`${API_URL}/complete-registration`, data);
  },
};
