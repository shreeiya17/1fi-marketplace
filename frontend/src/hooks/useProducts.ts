import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../lib/api";
import type { ProductSummary } from "../lib/api";

interface State {
  products: ProductSummary[];
  status: "idle" | "loading" | "error" | "success";
  error: string | null;
}

export function useProducts() {
  const [state, setState] = useState<State>({ products: [], status: "idle", error: null });

  const load = useCallback(() => {
    setState((s) => ({ ...s, status: "loading", error: null }));
    fetchProducts()
      .then((res) => setState({ products: res.products, status: "success", error: null }))
      .catch((err: Error) => setState((s) => ({ ...s, status: "error", error: err.message })));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}