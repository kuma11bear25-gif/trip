export interface Photo {
  id: string;
  prefectureCode: string;
  municipality: string;
  spotName: string;
  memo: string;
  takenAt: string | null;
  filename: string;
  createdAt: string;
}

export interface SummaryEntry {
  count: number;
  thumbnail: string | null;
}

export type Summary = Record<string, SummaryEntry>;

export interface NewPhotoInput {
  prefectureCode: string;
  municipality: string;
  spotName: string;
  memo: string;
  takenAt: string;
  image: File;
}
