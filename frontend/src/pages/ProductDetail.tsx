import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { ErrorBanner } from "../components/ErrorBanner";
import { useProductDetail } from "../hooks/useProductDetail";

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
        <pre className="flex-1 overflow-auto p-4 text-xs">{JSON.stringify(product, null, 2)}</pre>
      ) : null}
    </>
  );
}