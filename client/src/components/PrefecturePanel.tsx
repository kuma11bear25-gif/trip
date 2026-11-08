import { useMemo, useState } from "react";
import type { Photo } from "../types";
import { PREFECTURE_BY_CODE } from "../data/prefectures";
import PhotoGallery from "./PhotoGallery";
import UploadForm from "./UploadForm";

interface PrefecturePanelProps {
  prefectureCode: string;
  photos: Photo[];
  onClose: () => void;
  onOpenPhoto: (photo: Photo) => void;
  onUploaded: (photo: Photo) => void;
}

export default function PrefecturePanel({
  prefectureCode,
  photos,
  onClose,
  onOpenPhoto,
  onUploaded,
}: PrefecturePanelProps) {
  const [selectedMunicipality, setSelectedMunicipality] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const prefecture = PREFECTURE_BY_CODE[prefectureCode];

  const municipalities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const photo of photos) {
      counts.set(photo.municipality, (counts.get(photo.municipality) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [photos]);

  const filteredPhotos = selectedMunicipality
    ? photos.filter((p) => p.municipality === selectedMunicipality)
    : photos;

  return (
    <aside className="prefecture-panel">
      <header className="prefecture-panel__header">
        <div>
          <h2>{prefecture?.nameJa ?? prefectureCode}</h2>
          <p className="prefecture-panel__subtitle">
            {prefecture?.nameRomaji} ・ {photos.length}件の思い出
          </p>
        </div>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="閉じる">
          ×
        </button>
      </header>

      {municipalities.length > 0 && (
        <div className="municipality-chips">
          <button
            type="button"
            className={`chip${selectedMunicipality === null ? " chip--active" : ""}`}
            onClick={() => setSelectedMunicipality(null)}
          >
            すべて（{photos.length}）
          </button>
          {municipalities.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={`chip${selectedMunicipality === name ? " chip--active" : ""}`}
              onClick={() => setSelectedMunicipality(name)}
            >
              {name}（{count}）
            </button>
          ))}
        </div>
      )}

      {showUploadForm ? (
        <UploadForm
          prefectureCode={prefectureCode}
          prefectureName={prefecture?.nameJa ?? prefectureCode}
          knownMunicipalities={municipalities.map(([name]) => name)}
          onCancel={() => setShowUploadForm(false)}
          onSuccess={(photo) => {
            setShowUploadForm(false);
            onUploaded(photo);
          }}
        />
      ) : (
        <button type="button" className="btn btn--primary add-photo-btn" onClick={() => setShowUploadForm(true)}>
          + 写真を追加
        </button>
      )}

      <PhotoGallery photos={filteredPhotos} onOpen={onOpenPhoto} />
    </aside>
  );
}
