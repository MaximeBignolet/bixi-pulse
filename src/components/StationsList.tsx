import { useEffect, useState } from "react";
import { CircleAlert, Search, Star } from "lucide-react";
import { useStations } from "@/hooks/useStations";
import { useFavorite } from "@/hooks/useFavorite";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import { getAvailabilityLevel, AVAILABILITY_DOT_CLASSES } from "@/helpers/availability";
import { pluralize } from "@/helpers/format";
import { cn } from "@/lib/utils";

export function StationsList({onStationSelect}: {onStationSelect: (stationId: string) => void}) {
  const { stations, isError, isPending } = useStations();
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

  const filteredStations = stations
    .filter((station) => station.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((station) => !showFavoritesOnly || favorites.includes(station.station_id));

  const emptyMessage = showFavoritesOnly && !debouncedSearch
    ? "Aucune station favorite pour l'instant."
    : "Aucune station ne correspond à votre recherche.";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-2 border-b p-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Rechercher une station"
              value={search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Toggle
            pressed={showFavoritesOnly}
            onPressedChange={setShowFavoritesOnly}
            variant="outline"
            aria-label="N'afficher que les favoris"
           className="aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            <Star data-icon="inline-start" aria-hidden />
            Favoris
          </Toggle>
        </div>
        <p aria-live="polite" className="px-0.5 text-xs text-muted-foreground tabular-nums">
          {isPending
            ? "Chargement des stations…"
            : filteredStations.length === stations.length
              ? pluralize(stations.length, "station")
              : `${filteredStations.length} sur ${pluralize(stations.length, "station")}`}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isPending ? (
          <div aria-hidden className="divide-y">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2 px-3 py-3.5">
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
            <CircleAlert aria-hidden className="size-5 text-destructive" />
            <p className="text-sm text-muted-foreground">
              Impossible de charger les stations. Réessayez dans un instant.
            </p>
          </div>
        ) : filteredStations.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="divide-y">
            {filteredStations.map((station) => {
              const level = getAvailabilityLevel(station.num_bikes_available);
              const isFavorite = favorites.includes(station.station_id);

              return (
                <li
                  key={station.station_id}
                  className="flex items-center justify-between gap-2 px-3 py-2.5 transition-colors hover:bg-muted/50"
                >
                <button
                  type="button"
                  className="w-full cursor-pointer"
                  onClick={() => { onStationSelect?.(station.station_id) }}
                >
                   <div className="flex flex-col items-start">
                    <p className="truncate text-sm leading-tight font-medium">{station.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                      <span
                        aria-hidden
                        className={cn("size-1.5 rounded-full", AVAILABILITY_DOT_CLASSES[level])}
                      />
                      {pluralize(station.num_bikes_available, "vélo")}
                      {" · "}
                      {pluralize(station.num_docks_available, "borne")}
                    </p>
                  </div>
                 </button>
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(station.station_id, e)}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-end rounded-md transition-colors hover:bg-muted",
                      isFavorite ? "text-primary" : "text-muted-foreground/50 hover:text-foreground",
                    )}
                    >
                    <Star aria-hidden className={cn("size-4", isFavorite && "fill-current")} />
                  </button>
              </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
