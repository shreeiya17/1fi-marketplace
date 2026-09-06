import { Request, Response } from "express";
import { Product, Variant } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ApiError } from "../middleware/errorHandler";

type ProductWithDefaultVariants = Product & { variants: Variant[] };

// GET /api/products
export async function listProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      variants: { where: { isDefault: true } },
      emiPlans: { orderBy: { monthlyAmount: "asc" }, take: 1 },
    },
  });

  res.json({
    count: products.length,
    products: products.map((p: ProductWithDefaultVariants & { emiPlans: { monthlyAmount: number }[] }) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      imageUrl: p.imageUrl,
      mrp: p.mrp,
      price: p.price,
      defaultVariants: p.variants.map((v: Variant) => ({ type: v.type, label: v.label, value: v.value })),
      cheapestMonthly: p.emiPlans[0]?.monthlyAmount ?? null,
    })),
  });
}

// GET /api/products/:slug
export async function getProductBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      emiPlans: { orderBy: { tenureMonths: "asc" } },
    },
  });

  if (!product) {
    throw new ApiError(404, `No product found with slug "${slug}"`);
  }

  res.json({ product });
}