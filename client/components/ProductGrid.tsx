import ProductCard from "./ProductCard";

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

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  showViewAll?: boolean;
  columns?: 2 | 3 | 4 | 5;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  showViewAll = true,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>

          {showViewAll && (
            <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
              View All →
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
