import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminModal from "@/components/AdminModal";
import { addProduct } from "@/lib/products";

export default function AddProductModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await addProduct({
        name,
        price: Number(price),
        category,
        image,
        inStock: stock > 0,
        originalPrice: null,
        rating: 0,
        reviewCount: 0,
      });
      setSuccess("Product added successfully");
      setName("");
      setPrice(0);
      setCategory("");
      setImage("");
      setStock(0);
    } catch (err: any) {
      setError(err?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal triggerLabel="Add Product" title="Add Product">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <Input placeholder="Stock count" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />

        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-primary">{success}</p>}

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Product"}</Button>
        </div>
      </form>
    </AdminModal>
  );
}
