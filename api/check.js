import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9-aQ49WSzuDBBo2Q4lazaYv0pQ8z_CqQ",
  authDomain: "kas-key-auth.firebaseapp.com",
  projectId: "kas-key-auth",
  storageBucket: "kas-key-auth.firebasestorage.app",
  messagingSenderId: "1018809205436",
  appId: "1:1018809205436:web:cdacbb05391526914686b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  const { key, hwid } = req.query;

  if (!key || !hwid) {
    return res.status(400).json({ ok: false, reason: "Missing key or hwid" });
  }

  try {
    const docRef = doc(db, "keys", key);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(403).json({ ok: false, reason: "Bad key" });
    }

    const data = docSnap.data();

    // First-time use: bind HWID and mark used
    if (!data.hwid || data.hwid === "") {
      await updateDoc(docRef, { hwid: hwid, used: true });
      return res.json({ ok: true });
    }

    // HWID matches → allow
    if (data.hwid === hwid) {
      return res.json({ ok: true });
    }

    // HWID mismatch → reject
    return res.status(403).json({ ok: false, reason: "HWID mismatch" });

  } catch (err) {
    console.error("Firebase error:", err);
    return res.status(500).json({ ok: false, reason: "Server error" });
  }
}
