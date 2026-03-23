const { readDB } = require("../utils/database");

export default function handler(req, res) {
  const { key } = req.query;

  const db = readDB();
  const data = db.keys.find(k => k.key === key);

  if (!data) return res.json({ status: "not_found" });

  res.json(data);
}
