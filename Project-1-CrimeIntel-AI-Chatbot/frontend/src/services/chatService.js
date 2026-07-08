import api from "./api";

export const sendChatMessage = async (question, language = "english") => {
  const response = await api.post("/api/chat/", {
    question,
    language,
  });

  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get("/api/chat/history");
  return response.data;
};