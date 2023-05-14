import { api } from "./api";

export async function getTrips() {
  const response = await api.get("partners/trips");
  console.log(response);
  return response.data;
}
