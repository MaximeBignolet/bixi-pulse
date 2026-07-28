import { useEffect, useState } from "react";
import { useStations } from "../hooks/useStations";

export function StationsList() {
  const { stations, error, isError, isPending } = useStations();
  const [localeMontrealTime, setLocaleMontrealTime] = useState(() => {
    const date = new Date();
    return new Date(date.toLocaleString("en-US", { timeZone: "America/Montreal" })).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setLocaleMontrealTime(new Date(date.toLocaleString("en-US", { timeZone: "America/Montreal" })).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isError) {
    return <span>Erreur: {error?.message}</span>;
  }

  if (isPending) {
    return <span>Chargement...</span>;
  }

  if (!stations || stations.length === 0) {
    return <span>Aucune station trouvée</span>;
  }

  return (
    <div>
      <p>
        Heure locale: {localeMontrealTime}
      </p>
      <ul>
        {stations.map((station) => (
          <li key={station.station_id}>
          Station : {station.name} - {station.num_bikes_available} vélos disponibles - {station.num_docks_available} bornes disponibles
          </li>
        ))}
      </ul>
    </div>
  );
}
