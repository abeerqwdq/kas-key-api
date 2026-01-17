export default function handler(req, res) {
  const { key, hwid } = req.query;

  // 👑 ADMIN KEYS (NO HWID LOCK)
  const adminKeys = ["KASADMIN", "FRMODE"];

  // 🔑 USER KEYS (HWID LOCKED)
  let keys = {
    "12345": null,
    "48291": null,
    "70534": null,
    "16389": null,
    "94820": null
  };

  if (!key || !hwid) {
    return res.json({ status: "no", msg: "Missing data" });
  }

  // ADMIN BYPASS
  if (adminKeys.includes(key)) {
    return res.json({ status: "ok", admin: true });
  }

  // INVALID KEY
  if (!(key in keys)) {
    return res.json({ status: "no", msg: "Invalid key" });
  }

  // FIRST USE → BIND
  if (keys[key] === null) {
    keys[key] = hwid;
    return res.json({ status: "ok", bind: true });
  }

  // MATCH
  if (keys[key] === hwid) {
    return res.json({ status: "ok" });
  }

  // HWID MISMATCH
  return res.json({ status: "no", msg: "Nice try haha" });
}
