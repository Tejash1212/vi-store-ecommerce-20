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
                    <h3 className="font-semibold">{user.displayName || user.email}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Account</h4>
                    <p className="text-sm text-muted-foreground">Order history, saved items, and settings will appear here.</p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={signOut}>Sign Out</Button>
                    <Button variant="outline" disabled>View Orders</Button>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold">Admin Dashboard</h4>
                    <p className="text-sm text-muted-foreground">Accessible to admin users only. Admin features (product management, orders, analytics) will be placed here.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You are not signed in. Please sign in to view your profile.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
