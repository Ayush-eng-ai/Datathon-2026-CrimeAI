import api from "./api"

export const getCrimeLocations = async () => {
  const response = await api.get("/api/analytics/crime-locations")
  return response.data
}