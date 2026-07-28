import { useEffect, useState } from "react";
import { useStations } from "@/hooks/useStations";
import { useClock } from "@/hooks/useClock";
import { Input } from "./ui/input";
import { useFavorite } from "@/hooks/useFavorite";
import { Toggle } from "./ui/toggle";

export function StationsList() {
  const { stations, error, isError, isPending } = useStations();
  const localeMontrealTime = useClock();
  const { favorites, toggleFavorite } = useFavorite();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);
  

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  ).filter((station) => !showFavoritesOnly || favorites.includes(station.station_id));


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
      <div>
        <Toggle pressed={showFavoritesOnly} onPressedChange={setShowFavoritesOnly} size="sm" variant="outline">
            Favoris
        </Toggle>
      </div>
      <div>
        <Input placeholder="Rechercher une station" value={search} onChange={handleSearchChange}/>
      </div>
      <ul>
        {
          filteredStations.length ? (
            filteredStations.map((station) => (
              <li key={station.station_id}>
              Station : {station.name} - {station.num_bikes_available} vélos disponibles - {station.num_docks_available} bornes disponibles
              <button onClick={() => toggleFavorite(station.station_id)} aria-label={favorites.includes(station.station_id) ? "Retirer des favoris" : "Ajouter aux favoris"}>
                {favorites.includes(station.station_id) ? "★" : "☆"}
              </button>
              </li>
            ))
          ) : (
            <li>Aucune station ne correspond à votre recherche.</li>
          )
        }
      </ul>
    </div>
  );
}
