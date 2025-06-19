import axios from "./axios-instance";
const API_URL = `${import.meta.env.VITE_API}/api/users`;

export const UserService = {
  login(email, password) {
    return axios.post(`${API_URL}/login`, {
      email,
      password,
    });
  },
  register(data) {
    return axios.post(`${API_URL}/register`, {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      twId: data.twId,
      otp: data.otp,
    });
  },
  sendOtp(email) {
    return axios.post(`${API_URL}/send-otp`, { email });
  },
};
