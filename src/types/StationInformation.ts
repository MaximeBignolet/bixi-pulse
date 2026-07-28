
export interface StationsInformationDetail {
    station_id: string
    name: string
    short_name: string
    lat: number
    lon: number
    capacity: number
    rental_methods: Array<string>
  }

export interface StationInformation {
  stations: Array<StationsInformationDetail>
} 

export type GetStationInformationResponse = {
  data: StationInformation
}