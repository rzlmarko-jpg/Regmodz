const { readDB, writeDB } = require("../utils/database");

export default function handler(req, res) {
  const { key } = req.body;

  const db = readDB();
  db.keys = db.keys.filter(k => k.key !== key);

  writeDB(db);

  res.json({ status: "deleted" });
}
