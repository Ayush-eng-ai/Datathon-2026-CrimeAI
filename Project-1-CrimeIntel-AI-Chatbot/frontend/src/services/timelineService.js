import api from "./api"

export const getCaseTimeline = async (caseId) => {
  const response = await api.get(`/api/timeline/case/${caseId}`)
  return response.data
}