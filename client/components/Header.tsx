import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";
import { Search, User, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hidden, setHidden] = useState(false);

  const { cart } = useCart();
  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();

  // Keep header search in sync with URL query param 'q'
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
  }, [location.search]);

  // When user types in header, update URL 'q' param (debounced) so Index updates live
  const debounceTimer = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip initial mount to prevent unnecessary navigation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const current = params.get("q") || "";
      if (searchQuery !== current) {
        if (searchQuery.trim()) {
          navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`, {
            replace: true,
          });
        } else {
          navigate(`/`, { replace: true });
        }
      }
    }, 500); // Increased debounce time for better performance
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Track scroll direction to hide header on scroll down and show on scroll up
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const throttleTimer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastScrollY.current = window.scrollY || 0;
    const threshold = 15; // Increased threshold to reduce sensitivity

    const update = () => {
      const current = window.scrollY || 0;
      const diff = current - lastScrollY.current;

      if (Math.abs(diff) < threshold) {
        ticking.current = false;
        return;
      }

      if (diff > 0 && current > 120) {
        // scrolling down - only hide after scrolling past header height + some buffer
        setHidden(true);
      } else if (diff < 0) {
        // scrolling up
        setHidden(false);
      }

      lastScrollY.current = current;
      ticking.current = false;
    };

    // Throttle scroll events for better performance
    const onScroll = () => {
      if (throttleTimer.current) return;

      throttleTimer.current = window.setTimeout(() => {
        if (!ticking.current) {
          ticking.current = true;
          requestAnimationFrame(update);
        }
        throttleTimer.current = null;
      }, 16); // ~60fps
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      if (throttleTimer.current) {
        window.clearTimeout(throttleTimer.current);
      }
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-md transform transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <p style={{ margin: 0 }}>
                <strong style={{ color: "rgb(252, 251, 251)" }}>
                  <em>
                    <u>VI</u>
                  </em>
                </strong>
              </p>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-white text-lg">
                VI Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/profile"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
            >
              Profile
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchQuery.trim();
                navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
              }}
              className="relative w-full"
            >
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 rounded-full bg-white/5 text-white placeholder:text-white/60 shadow-sm border border-white/10"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Cart Modal */}
            <CartModal cartItemCount={cartItemCount} />

            {/* User Account */}
            <Link to="/login">
              <Button variant="ghost" size="icon" className="text-white/90">
                <User className="h-5 w-5 text-white/90" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white/90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-white/90" />
              ) : (
                <Menu className="h-5 w-5 text-white/90" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-white/5 rounded-b-md mt-2">
            {/* Mobile Search */}
            <div className="relative mb-4 px-4">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 rounded-full bg-white/5 text-white placeholder:text-white/60 shadow-sm border border-white/10"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2 px-4">
              <Link
                to="/"
                className="px-2 py-2 text-sm font-medium text-white/90 rounded-md hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-2 py-2 text-sm font-medium text-white/90 rounded-md hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/profile"
                className="px-2 py-2 text-sm font-medium text-white/90 rounded-md hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
