import { doc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function recordLogin(uid: string) {
  const ref = doc(db, "users", uid);
  await setDoc(ref, { lastLoginAt: serverTimestamp() }, { merge: true });
}

export async function incrementOrderCount(uid: string, by: number = 1) {
  const ref = doc(db, "users", uid);
  await setDoc(ref, { orderCount: increment(by) }, { merge: true });
}
