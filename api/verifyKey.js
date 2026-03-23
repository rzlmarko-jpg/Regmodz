const { readDB, writeDB } = require("../utils/database");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { key, hwid } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];

  const db = readDB();
  const data = db.keys.find(k => k.key === key);

  if (!data) return res.json({ status: "invalid" });

  if (data.status === "banned") return res.json({ status: "banned" });

  if (Date.now() > data.expired_at) {
    data.status = "expired";
    writeDB(db);
    return res.json({ status: "expired" });
  }

  // HWID LOCK
  if (!data.hwid) {
    data.hwid = hwid;
  } else if (data.hwid !== hwid) {
    return res.json({ status: "hwid_mismatch" });
  }

  data.usage_count += 1;

  data.logs.push({
    ip,
    ua,
    time: Date.now()
  });

  writeDB(db);

  res.json({
    status: "valid",
    expired_at: data.expired_at,
    hwid: data.hwid
  });
}
