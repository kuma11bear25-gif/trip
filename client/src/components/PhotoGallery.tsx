import { photoImageUrl } from "../api";
import type { Photo } from "../types";

interface PhotoGalleryProps {
  photos: Photo[];
  onOpen: (photo: Photo) => void;
}

export default function PhotoGallery({ photos, onOpen }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return <p className="empty-hint">まだ写真がありません。「写真を追加」から最初の思い出を記録しましょう。</p>;
  }

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <button
          key={photo.id}
          type="button"
          className="photo-gallery__item"
          onClick={() => onOpen(photo)}
        >
          <img src={photoImageUrl(photo.filename)} alt={photo.spotName} loading="lazy" />
          <span className="photo-gallery__caption">{photo.spotName}</span>
        </button>
      ))}
    </div>
  );
}
