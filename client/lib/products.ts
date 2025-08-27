import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type Product = {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  inStock?: boolean;
  discount?: number | null;
  createdAt?: any;
};

const productsCollection = collection(db, "products");

export async function addProduct(product: Product) {
  const createdAt = new Date();
  const docRef = await addDoc(productsCollection, { ...product, createdAt });
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, product);
}

export async function deleteProduct(id: string) {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
}

export async function getAllProducts() {
  const q = query(productsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }));
}

export function onProductsSnapshot(callback: (products: Product[]) => void) {
  const q = query(productsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }));
    callback(products);
  });
}
