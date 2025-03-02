import axios from "axios";
const API_URL = `${import.meta.env.VITE_API}/api/orders`;
import { TokenService } from "./token-service";

export const OrderService = {
  createOrder(data) {
    return axios.post(API_URL, data, {
      headers: { Authorization: TokenService.getToken() },
    });
  },
  getOrderByNumber(orderNumber) {
    return axios.get(`${API_URL}/number/${orderNumber}`, {
      headers: { Authorization: TokenService.getToken() },
    });
  },
  getOrderByUserId() {
    return axios.get(`${API_URL}/user/${localStorage.getItem("userId")}`, {
      headers: { Authorization: TokenService.getToken() },
    });
  },
  payOrder(orderNumber, twId) {
    return axios.put(
      `${API_URL}/payOrder/${orderNumber}`,
      { twId },
      {
        headers: {
          Authorization: TokenService.getToken(),
        },
      }
    );
  },
};
