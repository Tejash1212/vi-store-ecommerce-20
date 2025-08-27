import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminModal from "@/components/AdminModal";
import { onProductsSnapshot, deleteProduct, updateProduct, Product } from "@/lib/products";
import { Input } from "@/components/ui/input";

export default function ManageProductsModal() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);

  useEffect(() => {
    const unsub = onProductsSnapshot((p) => setProducts(p));
    return () => unsub();
  }, []);

  const startEdit = (p: Product) => {
    setEditingId(p.id || null);
    setEditName(p.name);
    setEditPrice(p.price);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    await updateProduct(editingId, { name: editName, price: Number(editPrice) });
    setEditingId(null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
  };

  return (
    <AdminModal triggerLabel="Edit Products" title="Manage Products" variant="outline">
      <div className="space-y-3">
        {products.length === 0 && <p className="text-sm text-muted-foreground">No products found.</p>}
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 p-2 border rounded">
            <div className="flex-1 min-w-0">
              {editingId === p.id ? (
                <div className="flex gap-2">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  <Input type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} />
                </div>
              ) : (
                <div>
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-sm text-muted-foreground">${p.price}</div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {editingId === p.id ? (
                <>
                  <Button size="sm" onClick={saveEdit}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={() => startEdit(p)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminModal>
  );
}
