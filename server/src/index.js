import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import photosRouter from "./routes/photos.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const PORT = process.env.PORT ?? 4000;

const app = express();
app.use(cors());
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api/photos", photosRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// multerのエラー（ファイル形式/サイズ）をJSONで返す
app.use((err, _req, res, _next) => {
  if (err) {
    res.status(400).json({ error: err.message ?? "リクエストが正しくありません" });
    return;
  }
  res.status(500).json({ error: "サーバーエラーが発生しました" });
});

app.listen(PORT, () => {
  console.log(`旅のアルバム地図 server listening on http://localhost:${PORT}`);
});
