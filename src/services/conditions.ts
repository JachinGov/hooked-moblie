import { apiFetch } from "./api";

export function getConditions(spotId: string) {
  return apiFetch(`/conditions/${spotId}`);
}
