import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductDetail() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Product Details</CardTitle>
              <CardDescription>
                Product detail features coming soon
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                This page will include:
              </p>
              <ul className="text-left space-y-2 text-sm text-muted-foreground">
                <li>• Product image gallery</li>
                <li>• Detailed descriptions</li>
                <li>• Customer reviews & ratings</li>
                <li>• Similar product recommendations</li>
                <li>• Add to cart & buy now options</li>
                <li>• Stock availability & shipping info</li>
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
