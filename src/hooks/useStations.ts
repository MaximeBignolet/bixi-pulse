import { useMemo } from "react"
import { useStationInformation } from "./useStationInformation"
import { useStationStatus } from "./useStationStatus"
import { mergeStations } from "../helpers/mergeStations"

export function useStations () {
  const {stations: stationsData, isError: isStatusError, error: statusError, isPending: isStatusPending} = useStationStatus()
  const {stations: stationsInformationData, isError: isInformationError, error: informationError, isPending: isInformationPending} = useStationInformation()
  const stations = useMemo(() => {
    return mergeStations(stationsData ?? [], stationsInformationData ?? [])
  }, [stationsData, stationsInformationData])

  if(stationsData && stationsInformationData) {
    return {
      stations: stations,
      isError: isStatusError || isInformationError,
      error: statusError || informationError,
      isPending: isStatusPending || isInformationPending
    }
  }
  return {
    stations: [],
    isError: isStatusError || isInformationError,
    error: statusError || informationError,
    isPending: isStatusPending || isInformationPending
  }
}