export default function handler(req, res) {
  const { key, hwid } = req.query;

  // 🔐 KEY DATABASE (ADD MORE KEYS HERE)
  const db = {
    "TESTKEY123": [],
  };

  // ❌ KEY NOT FOUND
  if (!db[key]) {
    return res.status(403).json({ ok: false, reason: "bad key" });
  }

  // 🔗 AUTO HWID BIND
  if (!db[key].includes(hwid)) {
    db[key].push(hwid);
  }

  // ✅ ALLOWED
  return res.json({ ok: true });
}
