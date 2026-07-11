import { useEffect, useMemo, useState } from "react"
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import { getCrimeLocations, getMapSummary } from "../../services/mapService"
import MapLegend from "./MapLegend"

const KARNATAKA_CENTER = [14.5204, 75.7224]

function getRiskColor(riskLevel) {
  if (riskLevel === "High") {
    return "#ef4444"
  }

  if (riskLevel === "Medium") {
    return "#f59e0b"
  }

  return "#10b981"
}

function CrimeMap() {
  const [locations, setLocations] = useState([])
  const [summary, setSummary] = useState({
    total_locations: 0,
    total_districts: 0,
    high_risk: 0,
    medium_risk: 0,
    low_risk: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedRisk, setSelectedRisk] = useState("All")

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setLoading(true)
        setError("")

        const [locationResponse, summaryResponse] =
          await Promise.all([
            getCrimeLocations(),
            getMapSummary(),
          ])

        setLocations(locationResponse.data || [])
        setSummary(summaryResponse)
      } catch (requestError) {
        console.error("Crime map API error:", requestError)

        setError(
          "Crime map data load nahi ho pa raha. Backend map API check karo."
        )
      } finally {
        setLoading(false)
      }
    }

    loadMapData()
  }, [])

  const filteredLocations = useMemo(() => {
    if (selectedRisk === "All") {
      return locations
    }

    return locations.filter(
      (location) => location.risk_level === selectedRisk
    )
  }, [locations, selectedRisk])

  return (
    <section className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          {
            label: "Mapped FIRs",
            value: summary.total_locations,
          },
          {
            label: "Districts",
            value: summary.total_districts,
          },
          {
            label: "High Risk",
            value: summary.high_risk,
          },
          {
            label: "Medium Risk",
            value: summary.medium_risk,
          },
          {
            label: "Low Risk",
            value: summary.low_risk,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              {item.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <MapLegend />

        <select
          value={selectedRisk}
          onChange={(event) => setSelectedRisk(event.target.value)}
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
        >
          <option value="All">All Risk Levels</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>
      </div>

      {loading && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-cyan-200">
          Loading geospatial crime intelligence...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-300">
          {error}
        </div>
      )}

      <div className="h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
        {!loading && !error && (
          <MapContainer
            center={KARNATAKA_CENTER}
            zoom={7}
            scrollWheelZoom
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredLocations.map((location) => {
              const markerColor = getRiskColor(
                location.risk_level
              )

              return (
                <CircleMarker
                  key={location.case_master_id}
                  center={[
                    location.latitude,
                    location.longitude,
                  ]}
                  radius={
                    location.risk_level === "High"
                      ? 13
                      : location.risk_level === "Medium"
                        ? 10
                        : 8
                  }
                  pathOptions={{
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.7,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="min-w-64">
                      <p className="text-base font-bold">
                        {location.crime_type || "Crime Record"}
                      </p>

                      <div className="mt-3 space-y-1 text-sm">
                        <p>
                          <strong>Crime No:</strong>{" "}
                          {location.crime_no}
                        </p>

                        <p>
                          <strong>District:</strong>{" "}
                          {location.district || "Not available"}
                        </p>

                        <p>
                          <strong>Police Station:</strong>{" "}
                          {location.police_station ||
                            "Not available"}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          {location.status || "Not available"}
                        </p>

                        <p>
                          <strong>Risk:</strong>{" "}
                          {location.risk_level}
                        </p>

                        <p>
                          <strong>Date:</strong>{" "}
                          {location.registered_date ||
                            "Not available"}
                        </p>
                      </div>

                      <p className="mt-3 text-sm leading-5">
                        {location.brief_facts ||
                          "No brief facts available."}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        )}
      </div>

      {!loading &&
        !error &&
        filteredLocations.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-center text-slate-400">
            Selected risk level ke liye koi mapped FIR nahi mila.
          </p>
        )}
    </section>
  )
}

export default CrimeMap