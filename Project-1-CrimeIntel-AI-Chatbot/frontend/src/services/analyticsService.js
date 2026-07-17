import api from "./api"

export const getDashboardSummary = async () => {
  const response = await api.get("/api/analytics/dashboard-summary")
  return response.data
}

export const getCrimeByDistrict = async () => {
  const response = await api.get("/api/analytics/crime-by-district")
  return response.data
}

export const getCrimeByType = async () => {
  const response = await api.get("/api/analytics/crime-by-type")
  return response.data
}

export const getMonthlyTrend = async () => {
  const response = await api.get("/api/analytics/monthly-trend")
  return response.data
}

export const getCaseStatusAnalytics = async () => {
  const response = await api.get("/api/analytics/case-status")
  return response.data
}