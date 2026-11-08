import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "..", "data", "db.json");

const adapter = new JSONFile(DB_FILE);
const db = new Low(adapter, { photos: [] });

await db.read();
db.data ||= { photos: [] };
db.data.photos ||= [];
await db.write();

export default db;
