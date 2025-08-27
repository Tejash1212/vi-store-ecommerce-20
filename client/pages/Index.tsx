import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter
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
        showViewAll={false}
      />

      {/* New Arrivals */}
      <ProductGrid
        products={newProducts}
        title="✨ New Arrivals"
        subtitle="Fresh products just for you"
        showViewAll={false}
      />

      {/* Most Bought Products */}
      <ProductGrid
        products={mostBoughtProducts}
        title="⭐ Most Bought"
        subtitle="Customer favorites"
        showViewAll={false}
      />

      {/* All Products */}
      <ProductGrid
        products={mockProducts}
        title="🗂️ All Products"
        subtitle="Browse our entire catalog"
        showViewAll={false}
        columns={4}
      />

      {/* About Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">About EliteStore</h2>
          <p className="text-muted-foreground max-w-3xl">
            EliteStore is a modern e-commerce storefront built to showcase trending items, new arrivals, and
            customer favorites all on a single homepage. Built with performance and usability in mind, the site
            includes search, filters, and a persistent cart modal for a smooth shopping experience. This demo
            uses mock data but is ready to integrate with a backend for products, authentication, and orders.
          </p>
        </div>
      </section>

    </div>
  );
}
