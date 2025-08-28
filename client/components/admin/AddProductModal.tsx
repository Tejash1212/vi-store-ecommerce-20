import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminModal from "@/components/AdminModal";
import { addProduct } from "@/lib/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Gaming",
  "Kitchen",
  "Furniture",
  "Audio",
  "Wearables",
  "Photography",
];

export default function AddProductModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const numericPrice = parseFloat(String(price) || "0");
      const numericStock = parseInt(String(stock) || "0", 10);

      await addProduct({
        name,
        price: Number(isNaN(numericPrice) ? 0 : numericPrice),
        category,
        image,
        inStock: numericStock > 0,
        originalPrice: null,
        rating: 0,
        reviewCount: 0,
        isNew: true,
      });
      setSuccess("Product added successfully");
      setName("");
      setPrice("");
      setCategory(CATEGORIES[0]);
      setImage("");
      setStock("");
    } catch (err: any) {
      setError(err?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal triggerLabel="Add Product" title="Add Product">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="text-sm font-medium">Product name</label>
        <Input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="text-sm font-medium">Image URL</label>
        <Input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className="text-sm font-medium">Price</label>
        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="text-sm font-medium">Stock count</label>
        <Input
          placeholder="Stock count"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && <p className="text-sm text-primary">{success}</p>}

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}
