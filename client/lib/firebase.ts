import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxe-52AYswAnDvSpGgdoa1T9cKbdo_rWc",
  authDomain: "e-commerce-a20c3.firebaseapp.com",
  projectId: "e-commerce-a20c3",
  storageBucket: "e-commerce-a20c3.firebasestorage.app",
  messagingSenderId: "938194686288",
  appId: "1:938194686288:web:6529e2f2e9c2bc1ffa9c55",
  measurementId: "G-WJKE5KEZ76",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
