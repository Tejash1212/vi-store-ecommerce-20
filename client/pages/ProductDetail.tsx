import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Star, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Mock products data (same as in Index.tsx)
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
    description: "High-quality wireless Bluetooth headphones with active noise cancellation, premium audio drivers, and up to 30 hours of battery life. Perfect for music lovers and professionals.",
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
    description: "Advanced fitness tracking with heart rate monitoring, GPS, sleep tracking, and water resistance. Compatible with iOS and Android devices.",
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
    description: "Professional-grade camera lens with exceptional optical quality, fast autofocus, and superior low-light performance. Ideal for portrait and landscape photography.",
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
    description: "Ergonomically designed office chair with lumbar support, adjustable height, and breathable mesh material. Perfect for long working hours.",
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
    description: "High-precision wireless gaming mouse with customizable RGB lighting, programmable buttons, and ultra-low latency for competitive gaming.",
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
    description: "Premium coffee maker with multiple brewing modes, built-in grinder, and programmable timer. Creates barista-quality coffee at home.",
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
    description: "Stylish and functional designer backpack with multiple compartments, laptop sleeve, and water-resistant material. Perfect for daily commute.",
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
    description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery life. Perfect for outdoor adventures.",
  },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mod = await import("@/lib/products");
        const fromDb = id ? await mod.getProductById(id) : null;
        if (active && fromDb) {
          setProduct(fromDb);
          return;
        }
      } catch (e) {
        // ignore and fallback to mock
      }
      const foundProduct = mockProducts.find((p) => p.id === id) || null;
      if (active) setProduct(foundProduct);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setLoading(true);
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    await new Promise((r) => setTimeout(r, 200));
    setLoading(false);
  };

  const handleBuyNow = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user?.uid || "guest",
        items: [{ productId: product.id, name: product.name, price: product.price, qty: 1 }],
        total: product.price,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  const discountPercentage = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
              )}
              {product.isTrending && (
                <Badge className="bg-orange-500 hover:bg-orange-600">Trending</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Category */}
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || loading}
                  className="flex-1"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                      Adding...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleWishlist}
                  size="icon"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted(product.id) ? "fill-current text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleBuyNow}
                disabled={!product.inStock || loading}
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
