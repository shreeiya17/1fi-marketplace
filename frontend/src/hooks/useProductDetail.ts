import { useCallback, useEffect, useState } from "react";
import { fetchProductBySlug } from "../lib/api";
import type { ProductDetail } from "../lib/api";

interface State {
  product: ProductDetail | null;
  status: "idle" | "loading" | "error" | "success";
  error: string | null;
}

export function useProductDetail(slug: string | undefined) {
  const [state, setState] = useState<State>({ product: null, status: "idle", error: null });

  const load = useCallback(() => {
    if (!slug) return;
    setState({ product: null, status: "loading", error: null });
    fetchProductBySlug(slug)
      .then((res) => setState({ product: res.product, status: "success", error: null }))
      .catch((err: Error) => setState({ product: null, status: "error", error: err.message }));
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}