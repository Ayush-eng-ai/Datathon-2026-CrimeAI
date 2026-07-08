import api from "./api";

export const generateSummary = async (inputText, caseMasterId = null) => {
  const response = await api.post("/api/summary/", {
    case_master_id: caseMasterId,
    input_text: inputText,
  });

  return response.data;
};

export const getSummaries = async () => {
  const response = await api.get("/api/summary/");
  return response.data;
};