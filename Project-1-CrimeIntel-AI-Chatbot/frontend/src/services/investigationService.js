import api from "./api"

export const getInvestigationAssistance = async (caseId) => {
  const response = await api.get(`/api/investigation/case/${caseId}`)
  return response.data
}