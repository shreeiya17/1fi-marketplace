import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { EmiPlanList } from "../components/EmiPlanList";
import { ErrorBanner } from "../components/ErrorBanner";
import { VariantSelector } from "../components/VariantSelector";
import { useProductDetail } from "../hooks/useProductDetail";
import type { ProductDetail } from "../lib/api";
import { formatInr } from "../lib/format";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { product, status, error, reload } = useProductDetail(slug);

  return (
    <>
      <AppBar title={product?.name ?? "Product"} onBack={() => navigate(-1)} />
      {status === "loading" || status === "idle" ? (
        <div className="flex flex-1 items-center justify-center text-sm text-muted">Loading product…</div>
      ) : status === "error" ? (
        <ErrorBanner message={error ?? "Couldn't load this product."} onRetry={reload} />
      ) : product ? (
        <ProductDetailBody product={product} />
      ) : null}
    </>
  );
}

function ProductDetailBody({ product }: { product: ProductDetail }) {
  const [selectedVariantIds, setSelectedVariantIds] = useState<Record<string, string>>({});
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const storageVariants = useMemo(() => product.variants.filter((v) => v.type === "STORAGE"), [product]);
  const colorVariants = useMemo(() => product.variants.filter((v) => v.type === "COLOR"), [product]);

  const activeStorageId =
    selectedVariantIds.STORAGE ?? storageVariants.find((v) => v.isDefault)?.id ?? storageVariants[0]?.id;
  const activeColorId =
    selectedVariantIds.COLOR ?? colorVariants.find((v) => v.isDefault)?.id ?? colorVariants[0]?.id;

  const cheapestPlanId = useMemo(
    () => [...product.emiPlans].sort((a, b) => a.monthlyAmount - b.monthlyAmount)[0]?.id ?? null,
    [product]
  );
  const activePlanId = selectedPlanId ?? cheapestPlanId;

  const storageDelta = storageVariants.find((v) => v.id === activeStorageId)?.priceDelta ?? 0;
  const effectivePrice = product.price + storageDelta;
  const activePlan = product.emiPlans.find((p) => p.id === activePlanId);

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex aspect-square items-center justify-center bg-canvas px-10 py-6">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
        </div>

        <div className="flex flex-col gap-5 px-5 pt-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted">{product.brand}</span>
            <h2 className="font-display text-xl font-extrabold text-ink">{product.name}</h2>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-lg font-extrabold text-ink">{formatInr(effectivePrice)}</span>
              {product.mrp > effectivePrice && (
                <span className="text-sm text-muted line-through">{formatInr(product.mrp)}</span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
          </div>

          {storageVariants.length > 0 && (
            <VariantSelector
              label="Storage"
              type="STORAGE"
              variants={storageVariants}
              selectedId={activeStorageId ?? ""}
              onSelect={(id) => setSelectedVariantIds((s) => ({ ...s, STORAGE: id }))}
            />
          )}

          {colorVariants.length > 0 && (
            <VariantSelector
              label="Colour"
              type="COLOR"
              variants={colorVariants}
              selectedId={activeColorId ?? ""}
              onSelect={(id) => setSelectedVariantIds((s) => ({ ...s, COLOR: id }))}
            />
          )}

          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted">EMI plans backed by mutual funds</span>
            <div className="mt-2">
              <EmiPlanList plans={product.emiPlans} selectedId={activePlanId} onSelect={setSelectedPlanId} />
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-line bg-surface p-4">
        {confirmed ? (
          <div className="rounded-xl bg-brand-soft px-4 py-3 text-center text-sm font-medium text-brand-strong">
            Plan selected — {activePlan ? `${formatInr(activePlan.monthlyAmount)}/mo` : ""} for {product.name}
          </div>
        ) : (
          <button
            type="button"
            disabled={!activePlan}
            onClick={() => setConfirmed(true)}
            className="w-full rounded-xl bg-brand py-3.5 text-center text-sm font-bold text-white disabled:opacity-50"
          >
            {activePlan ? `Proceed at ${formatInr(activePlan.monthlyAmount)}/mo` : "Select a plan to proceed"}
          </button>
        )}
      </div>
    </>
  );
}