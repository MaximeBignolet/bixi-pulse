import { useState } from "react";

export function useFavorite() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favoriteStations");
    const parsed = stored ? JSON.parse(stored) : [];
    try {
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(stationId: string) {
    let updated: string[];
    if (favorites.includes(stationId)) {
      updated = favorites.filter((id) => id !== stationId);
    } else {
      updated = [...favorites, stationId];
    }
    localStorage.setItem("favoriteStations", JSON.stringify(updated));
    setFavorites(updated);
  }

  return {
    favorites,
    toggleFavorite,
  };

}
