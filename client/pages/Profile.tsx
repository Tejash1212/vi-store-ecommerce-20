import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      {user.displayName || user.email}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Order history, saved items, and settings will appear here.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={signOut}>Sign Out</Button>
                    <Button variant="outline" disabled>
                      View Orders
                    </Button>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold">Admin Dashboard</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage products, orders and view analytics. These admin tools are available to all users in this demo.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-lg border bg-card">
                        <h5 className="font-semibold">Product Management</h5>
                        <p className="text-sm text-muted-foreground mb-3">Add, edit or remove products from the catalog.</p>
                        <div className="flex gap-2">
                          <AdminModal triggerLabel="Add Product" title="Add Product">
                            <p className="text-sm text-muted-foreground">Form to add a new product will appear here.</p>
                          </AdminModal>
                          <AdminModal triggerLabel="Edit Products" title="Edit Products" variant="outline">
                            <p className="text-sm text-muted-foreground">Product list and edit controls will appear here.</p>
                          </AdminModal>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border bg-card">
                        <h5 className="font-semibold">Orders</h5>
                        <p className="text-sm text-muted-foreground mb-3">Manage and update order statuses.</p>
                        <div className="flex gap-2">
                          <AdminModal triggerLabel="View Orders" title="Orders">
                            <p className="text-sm text-muted-foreground">Order list and status management will appear here.</p>
                          </AdminModal>
                          <AdminModal triggerLabel="Manage Returns" title="Manage Returns" variant="outline">
                            <p className="text-sm text-muted-foreground">Return requests and processing tools will appear here.</p>
                          </AdminModal>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border bg-card">
                        <h5 className="font-semibold">Analytics</h5>
                        <p className="text-sm text-muted-foreground mb-3">View sales, top products, and user engagement.</p>
                        <div className="flex gap-2">
                          <Button size="sm">View Dashboard</Button>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg border bg-card">
                        <h5 className="font-semibold">Settings</h5>
                        <p className="text-sm text-muted-foreground mb-3">Configure store settings, coupons and shipping.</p>
                        <div className="flex gap-2">
                          <Button size="sm">Store Settings</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You are not signed in. Please sign in to view your profile.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
