import { apiFetch } from "./api";

export async function createSpot(spot: {
  name: string;
  latitude: number;
  longitude: number;
  water_type: string;
  notes?: string;
}) {
  return apiFetch("/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });
}

export async function getSpots() {
  return apiFetch("/spots");
}

export async function getSpot(id: string) {
  return apiFetch(`/spots/${id}`);
}
