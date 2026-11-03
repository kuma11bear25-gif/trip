# 旅のアルバム地図

日本地図をクリックして、旅行先で撮った写真を記録できるWebアプリです。
訪れた都道府県・市区町村ごとに写真を保存し、地図上に写真のピンが並んでいく「旅の写真地図」を作ることができます。

## 主な機能

- インタラクティブな日本地図（47都道府県）。クリックすると都道府県ごとの記録パネルが開きます
- 写真のアップロード（観光地名・市区町村・訪問日・メモ付き）
- 市区町村ごとの絞り込み表示（クリックでその市区町村の写真だけを表示）
- 写真をアップロードした都道府県には、地図上にその写真のサムネイルがピンとして表示され、訪れた場所が「写真でできた日本地図」として可視化されます
- 写真をクリックすると拡大表示（詳細・メモの確認、削除）
- 薄い緑を基調にしたUIテーマ

## 技術構成

- `server/`: Node.js + Express のAPIサーバー。写真のメタデータは [lowdb](https://github.com/typicode/lowdb)（JSONファイル）に保存し、画像ファイルは `server/uploads/` に保存します
- `client/`: React + TypeScript + Vite のフロントエンド

都道府県の地図データは [geolonia/japanese-prefectures](https://github.com/geolonia/japanese-prefectures)（Wikipedia「日本地図.svg」を元に作成、GFDL）を使用しています。

## セットアップ

Node.js 18以上を推奨します。

```bash
npm run install:all
```

## 開発サーバーの起動

```bash
npm run dev
```

- フロントエンド: http://localhost:5173
- APIサーバー: http://localhost:4000

`client/vite.config.ts` で `/api` と `/uploads` を `http://localhost:4000` にプロキシしているため、開発時はフロントエンドのURLだけアクセスすれば動作します。

## 本番ビルド

```bash
npm run build
```

`client/dist` に静的ファイルが出力されます。配信する際は、ビルド成果物を配信しつつ、別途 `npm run start`（`server/`）でAPIサーバーを起動し、`/api` と `/uploads` へのアクセスをそちらにルーティングしてください。

## データの保存場所

- 写真メタデータ: `server/data/db.json`（Git管理外）
- アップロード画像: `server/uploads/`（Git管理外）

どちらも `.gitignore` で除外されているため、サーバーを動かす環境ごとにデータが蓄積されます。バックアップする場合はこの2つのディレクトリをまとめて保存してください。
