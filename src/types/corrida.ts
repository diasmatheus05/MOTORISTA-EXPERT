export interface Corrida {
  fare: number;
  dropoff: {
    timestamp: number | null;
  };
  vehicle_id: string;
  distance: number | null;
  start_city: {
    latitude: number;
    display_name: string;
    longitude: number;
  };
  status_changes: {
    status: string;
    timestamp: number;
  }[];
  pickup: {
    timestamp: number | null;
  };
  driver_id: string;
  status: string;
  duration: number;
  trip_id: string;
  currency_code: string;
}
