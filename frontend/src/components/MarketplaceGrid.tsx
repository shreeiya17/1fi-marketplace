import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { ErrorBanner } from "./ErrorBanner";

export function MarketplaceGrid() {
  const { products, status, error, reload } = useProducts();

  if (status === "loading" || status === "idle") {
    return <ProductGridSkeleton />;
  }

  if (status === "error") {
    return <ErrorBanner message={error ?? "Couldn't load the marketplace right now."} onRetry={reload} />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-y-auto px-5 py-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}