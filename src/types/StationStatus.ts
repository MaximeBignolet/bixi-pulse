export interface StationStatusDetail {
    station_id: string
    num_bikes_available: number
    num_ebikes_available: number
    num_bikes_disabled: number
    num_docks_available: number
    num_docks_disabled: number
    last_reported: number
  }

export interface StationStatus {
  stations: Array<StationStatusDetail>
} 

export type GetStationStatusResponse = {
  data: StationStatus
}