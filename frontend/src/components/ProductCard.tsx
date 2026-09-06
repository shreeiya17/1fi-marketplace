import { Link } from "react-router-dom";
import type { ProductSummary } from "../lib/api";
import { formatInr } from "../lib/format";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="flex aspect-square items-center justify-center bg-canvas p-4">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full rounded-xl object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted">{product.brand}</span>
        <h3 className="font-display text-sm font-bold leading-snug text-ink">{product.name}</h3>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="font-display text-sm font-extrabold text-ink">{formatInr(product.price)}</span>
        </div>
        {product.cheapestMonthly && (
          <span className="mt-1 w-fit rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-strong">
            EMI from {formatInr(product.cheapestMonthly)}/mo
          </span>
        )}
      </div>
    </Link>
  );
}