import { useEffect, useMemo, useState } from "react";
import AdminModal from "@/components/AdminModal";
import { getAllProducts } from "@/lib/products";
import { getAllOrders, Order } from "@/lib/orders";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid } from "recharts";

export default function AnalyticsModal() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      setProducts(await getAllProducts());
      setOrders(await getAllOrders());
    })();
  }, []);

  const revenue = useMemo(() => orders.reduce((s, o) => s + (o.total || 0), 0), [orders]);
  const orderByStatus = useMemo(() => {
    const map: Record<string, number> = {};
    for (const o of orders) map[o.status || 'Pending'] = (map[o.status || 'Pending'] || 0) + 1;
    return Object.entries(map).map(([status, count]) => ({ status, count }));
  }, [orders]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.category || 'Other'] = (map[p.category || 'Other'] || 0) + 1;
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [products]);

  return (
    <AdminModal triggerLabel="View Dashboard" title="Analytics">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Products</div>
            <div className="text-xl font-bold">{products.length}</div>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Orders</div>
            <div className="text-xl font-bold">{orders.length}</div>
          </div>
          <div className="p-3 rounded-lg border bg-card text-center">
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="text-xl font-bold">${revenue.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-56 p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">Orders by Status</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-56 p-3 rounded-lg border bg-card">
            <h4 className="font-semibold mb-2">Products by Category</h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={categoryCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#a78bfa55" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}
