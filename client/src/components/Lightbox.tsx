import { useEffect } from "react";
import { photoImageUrl } from "../api";
import type { Photo } from "../types";
import { PREFECTURE_BY_CODE } from "../data/prefectures";

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onDelete: (photo: Photo) => void;
}

export default function Lightbox({ photo, onClose, onDelete }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const prefName = PREFECTURE_BY_CODE[photo.prefectureCode]?.nameJa ?? photo.prefectureCode;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <img src={photoImageUrl(photo.filename)} alt={photo.spotName} />
        <div className="lightbox__info">
          <h3>{photo.spotName}</h3>
          <p className="lightbox__place">
            {prefName} {photo.municipality}
          </p>
          {photo.takenAt && <p className="lightbox__date">{photo.takenAt}</p>}
          {photo.memo && <p className="lightbox__memo">{photo.memo}</p>}
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => {
              if (window.confirm("この写真を削除しますか？")) onDelete(photo);
            }}
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
}
