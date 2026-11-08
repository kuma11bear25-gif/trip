import type { NewPhotoInput, Photo, Summary } from "./types";

async function parseJsonOrThrow(res: Response) {
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error ?? `リクエストに失敗しました (${res.status})`);
  }
  return body;
}

export function photoImageUrl(filename: string): string {
  return `/uploads/${filename}`;
}

export async function fetchSummary(): Promise<Summary> {
  const res = await fetch("/api/photos/summary");
  return parseJsonOrThrow(res);
}

export async function fetchPhotos(filter?: {
  prefectureCode?: string;
  municipality?: string;
}): Promise<Photo[]> {
  const params = new URLSearchParams();
  if (filter?.prefectureCode) params.set("prefecture", filter.prefectureCode);
  if (filter?.municipality) params.set("municipality", filter.municipality);
  const query = params.toString();
  const res = await fetch(`/api/photos${query ? `?${query}` : ""}`);
  return parseJsonOrThrow(res);
}

export async function uploadPhoto(input: NewPhotoInput): Promise<Photo> {
  const formData = new FormData();
  formData.set("prefectureCode", input.prefectureCode);
  formData.set("municipality", input.municipality);
  formData.set("spotName", input.spotName);
  formData.set("memo", input.memo);
  formData.set("takenAt", input.takenAt);
  formData.set("image", input.image);

  const res = await fetch("/api/photos", { method: "POST", body: formData });
  return parseJsonOrThrow(res);
}

export async function deletePhoto(id: string): Promise<void> {
  const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `削除に失敗しました (${res.status})`);
  }
}
