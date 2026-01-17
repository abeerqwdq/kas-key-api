export default function handler(req, res) {
  const { key, hwid } = req.query;

  // ===== ADMIN KEY (BYPASS HWID) =====
  if (key === "99999") {
    return res.status(200).send("OK");
  }

  // ===== NORMAL KEYS (HWID LOCKED) =====
  const keys = {
    "12345": null,
    "54321": null,
    "11111": null,
    "22222": null,
    "33333": null
  };

  if (!keys[key]) {
    return res.status(403).send("BAD_KEY");
  }

  // first use → lock hwid
  if (keys[key] === null) {
    keys[key] = hwid;
    return res.status(200).send("OK");
  }

  // hwid check
  if (keys[key] !== hwid) {
    return res.status(403).send("HWID_MISMATCH");
  }

  return res.status(200).send("OK");
}

