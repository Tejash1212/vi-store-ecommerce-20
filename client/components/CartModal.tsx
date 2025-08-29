import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "@/lib/icons";
import { useCart } from "@/context/CartContext";

interface CartModalProps {
  cartItemCount: number;
}

export default function CartModal({ cartItemCount }: CartModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { cart: cartItems, updateQuantity, removeFromCart, total } = useCart();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({cartItems.length})
          </DialogTitle>
          <DialogDescription>
            Review your items before checkout
          </DialogDescription>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button className="mt-4" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
