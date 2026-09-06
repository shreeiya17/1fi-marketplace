import { PrismaClient, VariantType } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Flat-rate EMI calculation, matching how EMI-on-mutual-fund products in the
 * reference (Snapmint-style) listing are typically priced: 0% for short
 * tenures, a flat annual rate for longer ones.
 */
function computeMonthly(principal: number, tenureMonths: number, annualRatePercent: number) {
  const totalInterest = principal * (annualRatePercent / 100) * (tenureMonths / 12);
  const total = principal + totalInterest;
  return Math.round(total / tenureMonths);
}

const TENURE_PLAN = [
  { tenureMonths: 3, interestRate: 0 },
  { tenureMonths: 6, interestRate: 0 },
  { tenureMonths: 12, interestRate: 0 },
  { tenureMonths: 24, interestRate: 0 },
  { tenureMonths: 36, interestRate: 10.5 },
  { tenureMonths: 48, interestRate: 10.5 },
  { tenureMonths: 60, interestRate: 10.5 },
];

const CASHBACK = 7500;

const PRODUCTS = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    description:
      "Apple's flagship Pro model with the A19 Pro chip, titanium frame, and a 48MP Pro camera system.",
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=800&q=80",
    mrp: 134900,
    price: 127400,
    variants: [
      { type: VariantType.STORAGE, label: "256GB", value: "256gb", priceDelta: 0, isDefault: true },
      { type: VariantType.STORAGE, label: "512GB", value: "512gb", priceDelta: 20000, isDefault: false },
      { type: VariantType.COLOR, label: "Cosmic Orange", value: "cosmic-orange", swatchHex: "#D9683B", isDefault: true },
      { type: VariantType.COLOR, label: "Silver", value: "silver", swatchHex: "#E4E4E4", isDefault: false },
      { type: VariantType.COLOR, label: "Deep Blue", value: "deep-blue", swatchHex: "#25384C", isDefault: false },
    ],
  },
  {
    slug: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    description:
      "Samsung's titanium-bodied Ultra with a 200MP camera, built-in S Pen, and Galaxy AI features.",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    mrp: 129999,
    price: 109999,
    variants: [
      { type: VariantType.STORAGE, label: "256GB", value: "256gb", priceDelta: 0, isDefault: true },
      { type: VariantType.STORAGE, label: "512GB", value: "512gb", priceDelta: 12000, isDefault: false },
      { type: VariantType.COLOR, label: "Titanium Black", value: "titanium-black", swatchHex: "#1C1C1E", isDefault: true },
      { type: VariantType.COLOR, label: "Titanium Gray", value: "titanium-gray", swatchHex: "#8A8D8F", isDefault: false },
      { type: VariantType.COLOR, label: "Titanium Violet", value: "titanium-violet", swatchHex: "#7C749A", isDefault: false },
    ],
  },
  {
    slug: "pixel-9-pro",
    name: "Pixel 9 Pro",
    brand: "Google",
    description:
      "Google's Tensor G4-powered Pro phone with the Pixel Camera stack and 7 years of OS updates.",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    mrp: 106999,
    price: 99999,
    variants: [
      { type: VariantType.STORAGE, label: "128GB", value: "128gb", priceDelta: 0, isDefault: true },
      { type: VariantType.STORAGE, label: "256GB", value: "256gb", priceDelta: 9000, isDefault: false },
      { type: VariantType.COLOR, label: "Obsidian", value: "obsidian", swatchHex: "#1B1B1D", isDefault: true },
      { type: VariantType.COLOR, label: "Porcelain", value: "porcelain", swatchHex: "#EDE7DE", isDefault: false },
      { type: VariantType.COLOR, label: "Rose Quartz", value: "rose-quartz", swatchHex: "#E8C4C4", isDefault: false },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const p of PRODUCTS) {
    const product = await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        description: p.description,
        imageUrl: p.imageUrl,
        mrp: p.mrp,
        price: p.price,
        variants: {
          create: p.variants,
        },
        emiPlans: {
          create: TENURE_PLAN.map((t) => ({
            tenureMonths: t.tenureMonths,
            interestRate: t.interestRate,
            monthlyAmount: computeMonthly(p.price, t.tenureMonths, t.interestRate),
            cashbackAmount: CASHBACK,
            fundedBy: "Mutual Fund SIP",
          })),
        },
      },
    });
    console.log(`  Created ${product.name} with ${p.variants.length} variants and ${TENURE_PLAN.length} EMI plans`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });