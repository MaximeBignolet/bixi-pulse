import { MapContainer, CircleMarker, Popup, TileLayer, useMap } from "react-leaflet";
import { useStations } from "@/hooks/useStations";
import {
  getAvailabilityLevel,
  AVAILABILITY_COLORS,
  AVAILABILITY_DOT_CLASSES,
} from "@/helpers/availability";
import { pluralize } from "@/helpers/format";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import type { Station } from "@/types/Station";

const LEGEND = [
  { label: "5 vélos et +", dotClass: AVAILABILITY_DOT_CLASSES.good },
  { label: "1 à 4", dotClass: AVAILABILITY_DOT_CLASSES.low },
  { label: "Aucun", dotClass: AVAILABILITY_DOT_CLASSES.none },
];

function StationPopupContent({ station }: {station: Station}) {
  return (
    <>
      <p className="text-sm leading-snug font-medium">{station.name}</p>
      <p className="mt-1 text-xs text-muted-foreground tabular-nums">
        {pluralize(station.num_bikes_available, "vélo")}
        {" · "}
        {pluralize(station.num_docks_available, "borne")}
      </p>
    </>
  );
}

function FlyToStation({ lat, lon }: { lat: number, lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lon], 16, { duration: 1.5 });
  }, [lat, lon, map]);

  return null;

}

export function MontrealMap({ selectedStationId }: {selectedStationId?: string}) {
  const { stations } = useStations();
  const selectedStation = stations.find((station) => station.station_id === selectedStationId);
  const lat = selectedStation?.lat;
  const lon = selectedStation?.lon;

  const memoizedSelectedStation = useMemo(() => {
    if (lat && lon) {
      return [lat, lon];
    }
    return null;
  }, [lat, lon]);

  return (
    <div className="relative h-full">
      <MapContainer center={[45.5017, -73.5673]} zoom={13} className="h-full w-full">
        {memoizedSelectedStation && <FlyToStation lat={memoizedSelectedStation[0]} lon={memoizedSelectedStation[1]} />}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {stations.map((station) => {
          const level = getAvailabilityLevel(station.num_bikes_available);

          return (
            <CircleMarker
              key={station.station_id}
              center={[station.lat, station.lon]}
              radius={6}
              pathOptions={{
                color: "#ffffff",
                weight: 1.5,
                fillColor: AVAILABILITY_COLORS[level],
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <StationPopupContent station={station} />
              </Popup>
            </CircleMarker>
          );
        })}
        {selectedStation && memoizedSelectedStation &&
              <Popup position={[memoizedSelectedStation[0], memoizedSelectedStation[1]]}>
                <StationPopupContent station={selectedStation} />
              </Popup>
        }
      </MapContainer>
      <div className="pointer-events-none absolute bottom-3 left-3 z-500 flex items-center gap-3 rounded-md border bg-background/95 px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm">
        {LEGEND.map(({ label, dotClass }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span aria-hidden className={cn("size-1.5 rounded-full", dotClass)} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
