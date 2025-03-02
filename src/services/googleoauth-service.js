import axios from "axios";
const API_URL = `${import.meta.env.VITE_API}/api/google`;

export const GoogleService = {
  login() {
    return axios.get(`${API_URL}/login`);
  },
  handleCallback(code, state) {
    return axios.get(`${API_URL}?code=${code}&state=${state}`);
  },

  completeRegistration(data) {
    return axios.post("${API_URL}/complete-registration", data);
  },
};
