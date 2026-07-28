import type { Station } from "../types/Station";
import type {  StationsInformationDetail } from "../types/StationInformation";
import type { StationStatusDetail } from "../types/StationStatus";


export function mergeStations(statusDetails: StationStatusDetail[], informationsDetails: StationsInformationDetail[]): Station[] {
  const stations = new Map<string, StationStatusDetail>()
  const mergedStations: Station[] = []

    for(const detail of statusDetails){
      stations.set(detail.station_id, detail)
    }


    for(const info of informationsDetails){
      const detail = stations.get(info.station_id)
      if(detail){
        mergedStations.push({ ...detail, ...info })
      }
    }

  return mergedStations
}