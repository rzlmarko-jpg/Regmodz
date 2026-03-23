const { readDB } = require("../utils/database");

export default function handler(req, res) {
  const db = readDB();
  res.json(db.keys);
}
