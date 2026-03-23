const { readDB, writeDB } = require("../utils/database");

export default function handler(req, res) {
  const { key } = req.body;

  const db = readDB();
  const data = db.keys.find(k => k.key === key);

  if (!data) return res.json({ status: "not_found" });

  data.status = "banned";

  writeDB(db);

  res.json({ status: "banned" });
}
