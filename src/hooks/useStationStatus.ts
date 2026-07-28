import { useQuery } from "@tanstack/react-query";
import type { GetStationStatusResponse } from "../types/StationStatus";
import { STATION_STATUS_ENDPOINT } from "../helpers/endpoints";

export function useStationStatus() {
  const {isError, data, error, isPending} = useQuery<GetStationStatusResponse>({
    queryKey: ['stationStatus'],
    queryFn: async () => {
      const response = await fetch(STATION_STATUS_ENDPOINT)
      if(!response.ok) {
        throw new Error('La réponse du serveur n\'est pas OK')
      }
      return response.json()
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  })


  return {
    stations: data?.data.stations,
    isError,
    error,
    isPending
  }
}