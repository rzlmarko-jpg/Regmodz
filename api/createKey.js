const { generateKey } = require("../utils/keygen");
const { readDB, writeDB } = require("../utils/database");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { duration } = req.body;

  const now = Date.now();
  let expire = now;

  if (duration === "1d") expire += 86400000;
  if (duration === "7d") expire += 7 * 86400000;
  if (duration === "30d") expire += 30 * 86400000;

  const key = generateKey();

  const db = readDB();

  db.keys.push({
    key,
    created_at: now,
    expired_at: expire,
    status: "active",
    hwid: null,
    usage_count: 0,
    max_devices: 1,
    logs: []
  });

  writeDB(db);

  res.json({ status: "success", key, expired_at: expire });
}
