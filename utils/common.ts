import { collection, doc, getFirestore } from "firebase/firestore";
import app from "@/firebaseConfig";

const db = getFirestore(app);

export function generateId(): string {
  return doc(collection(db, "tasks")).id;
}
