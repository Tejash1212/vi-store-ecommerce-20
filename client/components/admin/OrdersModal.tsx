import { useEffect, useState } from "react";
import AdminModal from "@/components/AdminModal";
import { onOrdersSnapshot, updateOrderStatus, Order } from "@/lib/orders";
import { Button } from "@/components/ui/button";

export default function OrdersModal() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsub = onOrdersSnapshot((o) => setOrders(o));
    return () => unsub();
  }, []);

  const handleUpdate = async (id?: string, nextStatus?: string) => {
    if (!id || !nextStatus) return;
    await updateOrderStatus(id, nextStatus);
  };

  return (
    <AdminModal triggerLabel="View Orders" title="Orders">
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {orders.length === 0 && (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        )}
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-3 border rounded flex items-start justify-between gap-3"
          >
            <div>
              <div className="font-medium">Order #{o.id}</div>
              <div className="text-sm text-muted-foreground">
                User: {o.userEmail || o.userId || "guest"}
              </div>
              <div className="text-sm text-muted-foreground">
                Total: ${o.total || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Status: {o.status || "Pending"}
              </div>
              {Array.isArray(o.items) && o.items.length > 0 && (
                <div className="text-sm mt-1">
                  <span className="font-medium">Items:</span>{" "}
                  {o.items
                    .map((it: any) => it?.name || it?.productName || it?.productId || it?.id)
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={() => handleUpdate(o.id, "Shipped")}>
                Mark Shipped
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdate(o.id, "Delivered")}
              >
                Mark Delivered
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminModal>
  );
}
