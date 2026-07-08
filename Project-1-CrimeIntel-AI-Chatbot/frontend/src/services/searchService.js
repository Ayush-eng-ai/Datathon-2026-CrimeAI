import api from "./api";

export const searchCrimes = async (params = {}) => {
  const response = await api.get("/api/search/crimes", { params });
  return response.data;
};