import {
  collection,
  addDoc,
  getDocs,
  getDoc,
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
  // Do NOT order by createdAt because some legacy docs may not have this field,
  // and Firestore would exclude them. We'll sort on the client when needed.
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }));
}

export async function getProductById(id: string) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Product) };
}

export function onProductsSnapshot(callback: (products: Product[]) => void) {
  // Subscribe to all products without ordering so docs missing createdAt are included
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Product),
    }));
    callback(products);
  });
}
