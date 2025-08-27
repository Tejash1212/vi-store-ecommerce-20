import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  ShieldCheck,
  Timer,
  Tag,
} from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 149.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 128,
    category: "Electronics",
    isTrending: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 89,
    category: "Wearables",
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Professional Camera Lens",
    price: 459.99,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 45,
    category: "Photography",
    isTrending: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 289.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 67,
    category: "Furniture",
    inStock: true,
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 203,
    category: "Gaming",
    isTrending: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Premium Coffee Maker",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviewCount: 156,
    category: "Kitchen",
    isNew: true,
    inStock: true,
  },
  {
    id: "7",
    name: "Designer Backpack",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 92,
    category: "Fashion",
    inStock: true,
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    price: 59.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviewCount: 178,
    category: "Audio",
    isTrending: true,
    inStock: true,
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<any[]>([]);

  // Sync searchQuery with URL param 'q'
  const { search } = window.location ? window.location : { search: "" };
  useEffect(() => {
    const params = new URLSearchParams(search);
    const q = params.get("q") || "";
    setSearchQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Subscribe to products collection in Firestore. Fall back to mockProducts while loading.
  useEffect(() => {
    let unsub: (() => void) | undefined;
    try {
      const { onProductsSnapshot } = require("@/lib/products");
      unsub = onProductsSnapshot((items: any[]) => setProducts(items || []));
    } catch (err) {
      console.warn("Could not subscribe to products snapshot:", err);
    }
    return () => unsub && unsub();
  }, []);

  const sourceProducts = products.length ? products : mockProducts;

  // Helper: base filter by category and search
  const baseFiltered = sourceProducts.filter((p) =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    (searchQuery.trim() === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Reusable sorter so the selected sort applies across all sections
  const sortProducts = (items: typeof mockProducts, sort: string) => {
    const copy = [...items];
    copy.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "popularity") return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sort === "newest") {
        const aNew = a.isNew ? 1 : 0;
        const bNew = b.isNew ? 1 : 0;
        if (aNew !== bNew) return bNew - aNew;
        const aId = Number(a.id);
        const bId = Number(b.id);
        if (!isNaN(aId) && !isNaN(bId)) return bId - aId;
        return 0;
      }
      // featured or unknown -> keep original order
      return 0;
    });
    return copy;
  };

  // Apply category/search filter then sort for each section
  const trendingProducts = sortProducts(baseFiltered.filter((p) => p.isTrending), sortBy).slice(0, 4);
  const newProducts = sortProducts(baseFiltered.filter((p) => p.isNew), sortBy).slice(0, 4);
  const mostBoughtProducts = sortProducts(baseFiltered, sortBy).slice(0, 4); // top items after sorting

  const filteredAll = sortProducts(baseFiltered, sortBy);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Gaming",
    "Kitchen",
    "Furniture",
  ];

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
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
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
  {trendingProducts.length > 0 && (
    <ProductGrid
      products={trendingProducts}
      title="🔥 Trending Products"
      subtitle="What's hot right now"
      showViewAll={false}
    />
  )}

      {/* New Arrivals */}
  {newProducts.length > 0 && (
    <ProductGrid
      products={newProducts}
      title="✨ New Arrivals"
      subtitle="Fresh products just for you"
      showViewAll={false}
    />
  )}

      {/* Most Bought Products */}
  {mostBoughtProducts.length > 0 && (
    <ProductGrid
      products={mostBoughtProducts}
      title="⭐ Most Bought"
      subtitle="Customer favorites"
      showViewAll={false}
    />
  )}

      {/* All Products */}
      <ProductGrid
        products={filteredAll}
        title="🗂️ All Products"
        subtitle="Browse our entire catalog"
        showViewAll={false}
        columns={4}
      />

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border bg-card p-8 md:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500" />
            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <h2 className="text-3xl font-bold mb-3">About VI Store</h2>
                <p className="text-muted-foreground mb-6">
                  VI Store brings together trending items, new arrivals, and
                  customer favorites in a clean, fast shopping experience. Enjoy
                  powerful search, filters, and a persistent cart modal — all
                  designed for seamless browsing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Secure checkout and protected data
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Timer className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Fast performance and quick browsing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-primary" />
                    <span className="text-sm">
                      Exclusive deals and seasonal offers
                    </span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-xl bg-muted" />
                <div className="aspect-square rounded-xl bg-muted" />
                <div className="col-span-2 h-24 rounded-xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Info at Bottom */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Free Shipping</h3>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Secure Payment</h3>
                <p className="text-xs text-muted-foreground">
                  100% secure checkout
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
              <RotateCcw className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Easy Returns</h3>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
              <Headphones className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">24/7 Support</h3>
                <p className="text-xs text-muted-foreground">
                  Always here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
