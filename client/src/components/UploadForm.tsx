import { useState, type FormEvent } from "react";
import { uploadPhoto } from "../api";
import type { Photo } from "../types";

interface UploadFormProps {
  prefectureCode: string;
  prefectureName: string;
  knownMunicipalities: string[];
  onSuccess: (photo: Photo) => void;
  onCancel: () => void;
}

export default function UploadForm({
  prefectureCode,
  prefectureName,
  knownMunicipalities,
  onSuccess,
  onCancel,
}: UploadFormProps) {
  const [municipality, setMunicipality] = useState("");
  const [spotName, setSpotName] = useState("");
  const [takenAt, setTakenAt] = useState("");
  const [memo, setMemo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("画像ファイルを選択してください");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const photo = await uploadPhoto({
        prefectureCode,
        municipality,
        spotName,
        memo,
        takenAt,
        image: file,
      });
      onSuccess(photo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h3>{prefectureName}に写真を追加</h3>

      <label>
        市区町村
        <input
          list="municipality-suggestions"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          placeholder="例：渋谷区"
          required
        />
        <datalist id="municipality-suggestions">
          {knownMunicipalities.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>

      <label>
        観光地・スポット名
        <input
          value={spotName}
          onChange={(e) => setSpotName(e.target.value)}
          placeholder="例：渋谷スクランブル交差点"
          required
        />
      </label>

      <label>
        訪れた日
        <input type="date" value={takenAt} onChange={(e) => setTakenAt(e.target.value)} />
      </label>

      <label>
        メモ
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="思い出や感想を記録しましょう"
          rows={3}
        />
      </label>

      <label>
        写真
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="upload-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? "保存中..." : "保存する"}
        </button>
      </div>
    </form>
  );
}
