export type VariantType = "COLOR" | "STORAGE";

export interface Variant {
  id: string;
  type: VariantType;
  label: string;
  value: string;
  priceDelta: number;
  swatchHex: string | null;
  isDefault: boolean;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyAmount: number;
  cashbackAmount: number;
  fundedBy: string;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  brand: string;
  imageUrl: string;
  mrp: number;
  price: number;
  defaultVariants: { type: VariantType; label: string; value: string }[];
  cheapestMonthly: number | null;
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  mrp: number;
  price: number;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

class ApiRequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiRequestError(res.status, body.error ?? `Request to ${path} failed`);
  }

  return res.json() as Promise<T>;
}

export function fetchProducts() {
  return request<{ count: number; products: ProductSummary[] }>("/products");
}

export function fetchProductBySlug(slug: string) {
  return request<{ product: ProductDetail }>(`/products/${slug}`);
}

export { ApiRequestError };