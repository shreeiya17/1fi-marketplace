import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ErrorBanner } from "./ErrorBanner";

export function MarketplaceGrid({ query }: { query: string }) {
  const { products, status, error, reload } = useProducts();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }, [products, query]);

  if (status === "loading" || status === "idle") {
    return <ProductGridSkeleton />;
  }

  if (status === "error") {
    return <ErrorBanner message={error ?? "Couldn't load the marketplace right now."} onRetry={reload} />;
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-10 text-center text-sm text-muted">
        No products match "{query}"
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-y-auto px-5 py-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}