import axios from "./axios-instance";
const API_URL = `${import.meta.env.VITE_API}/api/backstage/admin`;

export const AdminUsers = {
  login(data) {
    return axios.post(`${API_URL}/login`, data);
  },
  findByCondition(data) {
    return axios.post(`${API_URL}/findByCondition`, data);
  },
  getAdminEnum() {
    return axios.get(`${API_URL}/adminEnum`);
  },
  addAdminUser(data) {
    return axios.post(`${API_URL}/add`, data);
  },
  getAdminUserData(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  logout(id) {
    return axios.post(`${API_URL}/logout/${id}`);
  },
};
