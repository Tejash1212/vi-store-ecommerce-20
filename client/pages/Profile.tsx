import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">User Profile</CardTitle>
              <CardDescription>
                Profile management features coming soon
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                This page will include:
              </p>
              <ul className="text-left space-y-2 text-sm text-muted-foreground">
                <li>• Order history</li>
                <li>• Recently viewed products</li>
                <li>• Shopping cart management</li>
                <li>• Wishlist functionality</li>
                <li>• Account settings</li>
              </ul>
              <Button className="w-full" disabled>
                Continue with implementation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
