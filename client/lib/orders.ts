import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export type Order = {
  id?: string;
  userId?: string;
  items?: any[];
  total?: number;
  status?: string;
  createdAt?: any;
};

const ordersCollection = collection(db, "orders");

export async function getAllOrders() {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Order) }));
}

export function onOrdersSnapshot(callback: (orders: Order[]) => void) {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Order),
    }));
    callback(orders);
  });
}

export async function updateOrderStatus(id: string, status: string) {
  const docRef = doc(db, "orders", id);
  await updateDoc(docRef, { status });
}
