import { MapContainer, CircleMarker, Popup, TileLayer } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import { useStations } from '@/hooks/useStations';
import type { Station } from '@/types/Station';

function getStationColor(station: Station) {
    if (station.num_bikes_available > 0 && station.num_bikes_available < 5) {
      return '#f59e0b';
    } else if (station.num_bikes_available > 0) {
      return '#10b981';
    } else {
      return '#ef4444';
    }
  }


export function MontrealMap(){
  const {stations} = useStations()

 return (
    <MapContainer center={[45.5017, -73.5673]} zoom={13} className="h-125">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {
        stations.map((station) => (
          <CircleMarker key={station.station_id} center={[station.lat, station.lon]} pathOptions={{
            color: getStationColor(station),
            fillOpacity: 0.5,
          }}>
            <Popup>
              Station: {station.name} <br />
              Vélos disponibles: {station.num_bikes_available} <br />
              Bornes disponibles: {station.num_docks_available}
            </Popup>
          </CircleMarker>
        ))
      }
    </MapContainer>
  );
}