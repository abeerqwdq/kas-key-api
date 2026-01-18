export default function handler(req, res) {
  const { key, hwid } = req.query;

  const db = {
    "TESTKEY123": [],
  };

  if (!db[key]) {
    return res.status(403).json({ ok: false, reason: "bad key" });
  }

  if (!db[key].includes(hwid)) {
    db[key].push(hwid);
  }

  return res.json({ ok: true });
}
