import api from "./api"

export const getSimilarCases = async (caseId, limit = 5) => {
  const response = await api.get(
    `/api/recommendations/case/${caseId}`,
    {
      params: { limit },
    }
  )

  return response.data
}