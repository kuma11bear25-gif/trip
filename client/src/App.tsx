import { useCallback, useEffect, useState } from "react";
import JapanMap from "./components/JapanMap";
import PrefecturePanel from "./components/PrefecturePanel";
import Lightbox from "./components/Lightbox";
import { deletePhoto, fetchPhotos, fetchSummary } from "./api";
import type { Photo, Summary } from "./types";

export default function App() {
  const [summary, setSummary] = useState<Summary>({});
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const refreshSummary = useCallback(() => {
    fetchSummary().then(setSummary).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    refreshSummary();
  }, [refreshSummary]);

  useEffect(() => {
    if (!selectedCode) {
      setPhotos([]);
      return;
    }
    fetchPhotos({ prefectureCode: selectedCode })
      .then(setPhotos)
      .catch((err) => console.error(err));
  }, [selectedCode]);

  function handleUploaded(photo: Photo) {
    setPhotos((prev) => [photo, ...prev]);
    refreshSummary();
  }

  async function handleDelete(photo: Photo) {
    await deletePhoto(photo.id).catch((err) => {
      console.error(err);
      window.alert(err instanceof Error ? err.message : "削除に失敗しました");
      return;
    });
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setLightboxPhoto(null);
    refreshSummary();
  }

  const visitedCount = Object.values(summary).filter((s) => s.count > 0).length;
  const totalPhotos = Object.values(summary).reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="app">
      <header className="app__header">
        <h1>旅のアルバム地図</h1>
        <p className="app__tagline">都道府県をクリックして、旅の思い出を記録しよう</p>
        <div className="app__stats">
          <span>
            訪問済み <strong>{visitedCount}</strong> / 47 都道府県
          </span>
          <span>
            写真 <strong>{totalPhotos}</strong> 枚
          </span>
        </div>
      </header>

      <main className="app__main">
        <JapanMap summary={summary} selectedCode={selectedCode} onSelect={setSelectedCode} />

        {selectedCode && (
          <PrefecturePanel
            prefectureCode={selectedCode}
            photos={photos}
            onClose={() => setSelectedCode(null)}
            onOpenPhoto={setLightboxPhoto}
            onUploaded={handleUploaded}
          />
        )}
      </main>

      <footer className="app__footer">
        地図データ: <a href="https://github.com/geolonia/japanese-prefectures" target="_blank" rel="noreferrer">
          geolonia/japanese-prefectures
        </a>{" "}
        （Wikipedia「日本地図.svg」をもとに作成, GFDL）
      </footer>

      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
