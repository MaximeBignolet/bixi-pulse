import { useQuery } from "@tanstack/react-query";
import { STATION_INFORMATION_ENDPOINT } from "../helpers/endpoints";
import type { GetStationInformationResponse } from "../types/StationInformation";

export function useStationInformation() {
  const {isError, data, error, isPending} = useQuery<GetStationInformationResponse>({
    queryKey: ['stationInformation'],
    queryFn: async () => {
      const response = await fetch(STATION_INFORMATION_ENDPOINT)
      if(!response.ok) {
        throw new Error('La réponse du serveur n\'est pas OK')
      }
      return response.json()
    },
    staleTime: Infinity,
  })


  return {
    stations: data?.data.stations,
    isError,
    error,
    isPending
  }
}