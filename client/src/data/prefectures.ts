// 自動生成: 都道府県マスタデータ（SVG地図の重心座標を含む）
// 出典: geolonia/japanese-prefectures (GFDL, Wikipediaの日本地図.svgを元に作成)
export type Region =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kinki"
  | "chugoku"
  | "shikoku"
  | "kyushu"
  | "kyushu-okinawa"

export interface Prefecture {
  code: string;
  nameJa: string;
  nameRomaji: string;
  region: Region;
  regionLabel: string;
  /** SVG map viewBox上の相対位置 (0-1) */
  cx: number;
  cy: number;
}

export const PREFECTURES: Prefecture[] = [
  { code: "01", nameJa: "北海道", nameRomaji: "Hokkaido", region: "hokkaido", regionLabel: "北海道", cx: 0.759, cy: 0.1855 },
  { code: "02", nameJa: "青森", nameRomaji: "Aomori", region: "tohoku", regionLabel: "東北", cx: 0.673, cy: 0.346 },
  { code: "03", nameJa: "岩手", nameRomaji: "Iwate", region: "tohoku", regionLabel: "東北", cx: 0.704, cy: 0.4255 },
  { code: "04", nameJa: "宮城", nameRomaji: "Miyagi", region: "tohoku", regionLabel: "東北", cx: 0.6875, cy: 0.502 },
  { code: "05", nameJa: "秋田", nameRomaji: "Akita", region: "tohoku", regionLabel: "東北", cx: 0.653, cy: 0.421 },
  { code: "06", nameJa: "山形", nameRomaji: "Yamagata", region: "tohoku", regionLabel: "東北", cx: 0.6445, cy: 0.5005 },
  { code: "07", nameJa: "福島", nameRomaji: "Fukushima", region: "tohoku", regionLabel: "東北", cx: 0.6465, cy: 0.566 },
  { code: "08", nameJa: "茨城", nameRomaji: "Ibaraki", region: "kanto", regionLabel: "関東", cx: 0.658, cy: 0.63 },
  { code: "09", nameJa: "栃木", nameRomaji: "Tochigi", region: "kanto", regionLabel: "関東", cx: 0.633, cy: 0.611 },
  { code: "10", nameJa: "群馬", nameRomaji: "Gunma", region: "kanto", regionLabel: "関東", cx: 0.595, cy: 0.6215 },
  { code: "11", nameJa: "埼玉", nameRomaji: "Saitama", region: "kanto", regionLabel: "関東", cx: 0.609, cy: 0.6525 },
  { code: "12", nameJa: "千葉", nameRomaji: "Chiba", region: "kanto", regionLabel: "関東", cx: 0.6605, cy: 0.6845 },
  { code: "13", nameJa: "東京", nameRomaji: "Tokyo", region: "kanto", regionLabel: "関東", cx: 0.6155, cy: 0.6725 },
  { code: "14", nameJa: "神奈川", nameRomaji: "Kanagawa", region: "kanto", regionLabel: "関東", cx: 0.612, cy: 0.691 },
  { code: "15", nameJa: "新潟", nameRomaji: "Niigata", region: "chubu", regionLabel: "中部", cx: 0.5795, cy: 0.551 },
  { code: "16", nameJa: "富山", nameRomaji: "Toyama", region: "chubu", regionLabel: "中部", cx: 0.506, cy: 0.615 },
  { code: "17", nameJa: "石川", nameRomaji: "Ishikawa", region: "chubu", regionLabel: "中部", cx: 0.4825, cy: 0.6045 },
  { code: "18", nameJa: "福井", nameRomaji: "Fukui", region: "chubu", regionLabel: "中部", cx: 0.449, cy: 0.665 },
  { code: "19", nameJa: "山梨", nameRomaji: "Yamanashi", region: "chubu", regionLabel: "中部", cx: 0.576, cy: 0.681 },
  { code: "20", nameJa: "長野", nameRomaji: "Nagano", region: "chubu", regionLabel: "中部", cx: 0.5445, cy: 0.6475 },
  { code: "21", nameJa: "岐阜", nameRomaji: "Gifu", region: "chubu", regionLabel: "中部", cx: 0.4905, cy: 0.667 },
  { code: "22", nameJa: "静岡", nameRomaji: "Shizuoka", region: "chubu", regionLabel: "中部", cx: 0.5595, cy: 0.7095 },
  { code: "23", nameJa: "愛知", nameRomaji: "Aichi", region: "chubu", regionLabel: "中部", cx: 0.505, cy: 0.717 },
  { code: "24", nameJa: "三重", nameRomaji: "Mie", region: "kinki", regionLabel: "近畿", cx: 0.46, cy: 0.7485 },
  { code: "25", nameJa: "滋賀", nameRomaji: "Shiga", region: "kinki", regionLabel: "近畿", cx: 0.4465, cy: 0.701 },
  { code: "26", nameJa: "京都", nameRomaji: "Kyoto", region: "kinki", regionLabel: "近畿", cx: 0.413, cy: 0.701 },
  { code: "27", nameJa: "大阪", nameRomaji: "Osaka", region: "kinki", regionLabel: "近畿", cx: 0.41, cy: 0.737 },
  { code: "28", nameJa: "兵庫", nameRomaji: "Hyogo", region: "kinki", regionLabel: "近畿", cx: 0.382, cy: 0.706 },
  { code: "29", nameJa: "奈良", nameRomaji: "Nara", region: "kinki", regionLabel: "近畿", cx: 0.434, cy: 0.7585 },
  { code: "30", nameJa: "和歌山", nameRomaji: "Wakayama", region: "kinki", regionLabel: "近畿", cx: 0.4155, cy: 0.7845 },
  { code: "31", nameJa: "鳥取", nameRomaji: "Tottori", region: "chugoku", regionLabel: "中国", cx: 0.3295, cy: 0.6925 },
  { code: "32", nameJa: "島根", nameRomaji: "Shimane", region: "chugoku", regionLabel: "中国", cx: 0.261, cy: 0.713 },
  { code: "33", nameJa: "岡山", nameRomaji: "Okayama", region: "chugoku", regionLabel: "中国", cx: 0.3305, cy: 0.72 },
  { code: "34", nameJa: "広島", nameRomaji: "Hiroshima", region: "chugoku", regionLabel: "中国", cx: 0.2725, cy: 0.733 },
  { code: "35", nameJa: "山口", nameRomaji: "Yamaguchi", region: "chugoku", regionLabel: "中国", cx: 0.21, cy: 0.755 },
  { code: "36", nameJa: "徳島", nameRomaji: "Tokushima", region: "shikoku", regionLabel: "四国", cx: 0.3465, cy: 0.7835 },
  { code: "37", nameJa: "香川", nameRomaji: "Kagawa", region: "shikoku", regionLabel: "四国", cx: 0.3365, cy: 0.763 },
  { code: "38", nameJa: "愛媛", nameRomaji: "Ehime", region: "shikoku", regionLabel: "四国", cx: 0.2755, cy: 0.803 },
  { code: "39", nameJa: "高知", nameRomaji: "Kochi", region: "shikoku", regionLabel: "四国", cx: 0.3065, cy: 0.818 },
  { code: "40", nameJa: "福岡", nameRomaji: "Fukuoka", region: "kyushu", regionLabel: "九州", cx: 0.159, cy: 0.799 },
  { code: "41", nameJa: "佐賀", nameRomaji: "Saga", region: "kyushu", regionLabel: "九州", cx: 0.1345, cy: 0.8105 },
  { code: "42", nameJa: "長崎", nameRomaji: "Nagasaki", region: "kyushu", regionLabel: "九州", cx: 0.1235, cy: 0.826 },
  { code: "43", nameJa: "熊本", nameRomaji: "Kumamoto", region: "kyushu", regionLabel: "九州", cx: 0.167, cy: 0.8515 },
  { code: "44", nameJa: "大分", nameRomaji: "Oita", region: "kyushu", regionLabel: "九州", cx: 0.2015, cy: 0.819 },
  { code: "45", nameJa: "宮崎", nameRomaji: "Miyazaki", region: "kyushu", regionLabel: "九州", cx: 0.1905, cy: 0.8875 },
  { code: "46", nameJa: "鹿児島", nameRomaji: "Kagoshima", region: "kyushu", regionLabel: "九州", cx: 0.153, cy: 0.916 },
  { code: "47", nameJa: "沖縄", nameRomaji: "Okinawa", region: "kyushu-okinawa", regionLabel: "九州・沖縄", cx: 0.3475, cy: 0.234 },
];

export const PREFECTURE_BY_CODE: Record<string, Prefecture> = Object.fromEntries(
  PREFECTURES.map((p) => [p.code, p])
);

