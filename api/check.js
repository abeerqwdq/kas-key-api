export default function handler(req, res) {
  const { key, hwid } = req.query;

  // 🔐 KEYS (ADD MORE IF YOU WANT)
  const db = {
    "TESTKEY123": [],
  };

  // ❌ INVALID KEY
  if (!db[key]) {
    return res.status(403).json({ ok: false, reason: "bad key" });
  }

  // 🔗 AUTO HWID BIND
  if (!db[key].includes(hwid)) {
    db[key].push(hwid);
  }

  // ✅ SUCCESS
  return res.json({ ok: true });
}

