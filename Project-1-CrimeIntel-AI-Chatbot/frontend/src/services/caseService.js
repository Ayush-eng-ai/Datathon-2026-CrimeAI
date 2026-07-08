import api from "./api";

export const getCases = async () => {
  const response = await api.get("/api/cases/");
  return response.data;
};

export const createCase = async (caseData) => {
  const response = await api.post("/api/cases/", caseData);
  return response.data;
};