import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
  inStock: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted: isWL } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    await new Promise((r) => setTimeout(r, 200));
    setIsLoading(false);
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user?.uid || "guest",
        items: [{ productId: product.id, name: product.name, price: product.price, qty: 1 }],
        total: product.price,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image });
    setIsWishlisted(!isWL(product.id));
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="product-hover bg-card rounded-lg border overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Trending
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${isWL(product.id) ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="space-y-2">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                size="sm"
              >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                  Adding...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </div>
              )}
              </Button>
              <Button
                variant="outline"
                onClick={handleBuyNow}
                disabled={!product.inStock || isLoading}
                size="sm"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
