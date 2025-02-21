export const TokenService = {
  getToken() {
    return `Bearer ${localStorage.getItem("token")}` || "";
  },
};
