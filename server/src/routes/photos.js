import express from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";
import db from "../db.js";
import { VALID_PREFECTURE_CODES } from "../data/prefectures.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

const ALLOWED_MIME = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = ALLOWED_MIME[file.mimetype] ?? "";
    cb(null, `${nanoid()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("対応していない画像形式です（JPEG/PNG/WebP/GIFのみ）"));
    }
  },
});

function trimmedOrNull(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

const router = express.Router();

// 都道府県ごとの写真件数・サムネイル（地図上のオーバーレイ用）
router.get("/summary", (_req, res) => {
  const byPrefecture = {};
  for (const photo of db.data.photos) {
    const entry = byPrefecture[photo.prefectureCode] ?? { count: 0, thumbnail: null };
    entry.count += 1;
    if (!entry.thumbnail || photo.createdAt > entry.thumbnailCreatedAt) {
      entry.thumbnail = photo.filename;
      entry.thumbnailCreatedAt = photo.createdAt;
    }
    byPrefecture[photo.prefectureCode] = entry;
  }
  for (const entry of Object.values(byPrefecture)) {
    delete entry.thumbnailCreatedAt;
  }
  res.json(byPrefecture);
});

// 一覧取得（都道府県・市町村での絞り込み可）
router.get("/", (req, res) => {
  const { prefecture, municipality } = req.query;
  let photos = db.data.photos;
  if (prefecture) {
    photos = photos.filter((p) => p.prefectureCode === prefecture);
  }
  if (municipality) {
    photos = photos.filter((p) => p.municipality === municipality);
  }
  photos = [...photos].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json(photos);
});

// 新規アップロード
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "画像ファイルを選択してください" });
  }

  const prefectureCode = trimmedOrNull(req.body.prefectureCode);
  const municipality = trimmedOrNull(req.body.municipality);
  const spotName = trimmedOrNull(req.body.spotName);

  if (!prefectureCode || !VALID_PREFECTURE_CODES.has(prefectureCode)) {
    fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => {});
    return res.status(400).json({ error: "都道府県が正しくありません" });
  }
  if (!municipality) {
    fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => {});
    return res.status(400).json({ error: "市区町村を入力してください" });
  }
  if (!spotName) {
    fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => {});
    return res.status(400).json({ error: "観光地・スポット名を入力してください" });
  }

  const photo = {
    id: nanoid(),
    prefectureCode,
    municipality,
    spotName,
    memo: trimmedOrNull(req.body.memo) ?? "",
    takenAt: trimmedOrNull(req.body.takenAt),
    filename: req.file.filename,
    createdAt: new Date().toISOString(),
  };

  db.data.photos.push(photo);
  db.write().then(() => res.status(201).json(photo));
});

// 削除
router.delete("/:id", async (req, res) => {
  const index = db.data.photos.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "写真が見つかりません" });
  }
  const [removed] = db.data.photos.splice(index, 1);
  await db.write();
  fs.unlink(path.join(UPLOAD_DIR, removed.filename), () => {});
  res.status(204).end();
});

export default router;
