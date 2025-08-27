import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 128,
    category: "Electronics",
    isTrending: true,
    inStock: true
  },
  {
    id: "2", 
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 89,
    category: "Wearables",
    isNew: true,
    inStock: true
  },
  {
    id: "3",
    name: "Professional Camera Lens",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 45,
    category: "Photography",
    isTrending: true,
    inStock: true
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 289.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 67,
    category: "Furniture",
    inStock: true
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 203,
    category: "Gaming",
    isTrending: true,
    inStock: true
  },
  {
    id: "6",
    name: "Premium Coffee Maker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviewCount: 156,
    category: "Kitchen",
    isNew: true,
    inStock: true
  },
  {
    id: "7",
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 92,
    category: "Fashion",
    inStock: true
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    price: 59.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviewCount: 178,
    category: "Audio",
    isTrending: true,
    inStock: true
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter products by category
  const trendingProducts = mockProducts.filter(p => p.isTrending).slice(0, 4);
  const newProducts = mockProducts.filter(p => p.isNew).slice(0, 4);
  const mostBoughtProducts = mockProducts.slice(0, 4); // Simulate most bought

  const categories = ["All", "Electronics", "Fashion", "Gaming", "Kitchen", "Furniture"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Shop the latest trends, best deals, and premium quality products all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Free Shipping</h3>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Secure Payment</h3>
                <p className="text-xs text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <RotateCcw className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Easy Returns</h3>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <Headphones className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">24/7 Support</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded px-3 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <ProductGrid
        products={trendingProducts}
        title="🔥 Trending Products"
        subtitle="What's hot right now"
      />

      {/* New Arrivals */}
      <ProductGrid
        products={newProducts}
        title="✨ New Arrivals"
        subtitle="Fresh products just for you"
      />

      {/* Most Bought Products */}
      <ProductGrid
        products={mostBoughtProducts}
        title="⭐ Most Bought"
        subtitle="Customer favorites"
      />

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive deals, new product updates, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button>
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">EliteStore</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your one-stop shop for quality products at unbeatable prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">About Us</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Contact</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">FAQ</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Shipping</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Electronics</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Fashion</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Gaming</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Kitchen</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Returns</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Privacy Policy</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Terms of Service</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Help Center</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EliteStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
