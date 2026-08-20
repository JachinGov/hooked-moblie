import { apiFetch } from "./api";

export type CreateCatchData = {
  spotId: string;
  species: string;
  weight?: number | null;
  length?: number | null;
  notes?: string | null;
};

export type Catch = {
  id: string;
  user_id: string;
  spot_id: string;
  spot_name?: string | null;
  species: string;
  weight: number | null;
  length: number | null;
  caught_at: string;
  notes: string | null;
  photo_url?: string | null;
};

export async function createCatch(data: CreateCatchData) {
  return apiFetch("/catches", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCatches() {
  return apiFetch("/catches");
}
