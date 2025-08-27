import { RequestHandler } from "express";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../client/lib/firebase";

const productsToAdd = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 128,
    category: "Electronics",
    isTrending: true,
    inStock: true,
  },
  {
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 89,
    category: "Wearables",
    isNew: true,
    inStock: true,
  },
  {
    name: "Professional Camera Lens",
    price: 459.99,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 45,
    category: "Photography",
    isTrending: true,
    inStock: true,
  },
  {
    name: "Ergonomic Office Chair",
    price: 289.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 67,
    category: "Furniture",
    inStock: true,
  },
  {
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 203,
    category: "Gaming",
    isTrending: true,
    inStock: true,
  },
  {
    name: "Premium Coffee Maker",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviewCount: 156,
    category: "Kitchen",
    isNew: true,
    inStock: true,
  },
  {
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 92,
    category: "Fashion",
    inStock: true,
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviewCount: 178,
    category: "Audio",
    isTrending: true,
    inStock: true,
  },
];

export const handleSeedProducts: RequestHandler = async (req, res) => {
  try {
    const names = productsToAdd.map((p) => p.name);
    const productsCol = collection(db, "products");

    // Query existing products by name (where-in supports up to 10)
    const existingQuery = query(productsCol, where("name", "in", names));
    const snapshot = await getDocs(existingQuery);
    const existingNames = new Set(
      snapshot.docs.map((d) => (d.data() as any).name),
    );

    const toCreate = productsToAdd.filter((p) => !existingNames.has(p.name));

    await Promise.all(
      toCreate.map((p) => addDoc(productsCol, { ...p, createdAt: new Date() })),
    );

    res.json({
      added: toCreate.length,
      skipped: productsToAdd.length - toCreate.length,
    });
  } catch (err: any) {
    console.error("Seed products failed:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
};
