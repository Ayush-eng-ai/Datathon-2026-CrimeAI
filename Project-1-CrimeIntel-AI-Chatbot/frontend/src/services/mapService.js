import api from "./api"

export const getCrimeLocations = async () => {
  const response = await api.get("/api/map/crime-locations")
  return response.data
}

export const getMapSummary = async () => {
  const response = await api.get("/api/map/summary")
  return response.data
}