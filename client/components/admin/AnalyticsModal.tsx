import { useEffect, useState } from "react";
import AdminModal from "@/components/AdminModal";
import { getAllProducts } from "@/lib/products";
import { getAllOrders } from "@/lib/orders";
import { Button } from "@/components/ui/button";

export default function AnalyticsModal() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      setProductCount(products.length);
      const orders = await getAllOrders();
      setOrderCount(orders.length);
      const total = orders.reduce((s, o) => s + (o.total || 0), 0);
      setRevenue(total);
    })();
  }, []);

  return (
    <AdminModal triggerLabel="View Dashboard" title="Analytics">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Products</div>
            <div className="text-xl font-bold">{productCount}</div>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Orders</div>
            <div className="text-xl font-bold">{orderCount}</div>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="text-xl font-bold">${revenue.toFixed(2)}</div>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Basic analytics summary. Connect to external analytics for more insights.</p>
        </div>
      </div>
    </AdminModal>
  );
}
