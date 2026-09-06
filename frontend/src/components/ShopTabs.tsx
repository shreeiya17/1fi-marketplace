export type ShopTab = "top-brands" | "nearby-stores" | "marketplace";

const TABS: { key: ShopTab; label: string }[] = [
  { key: "top-brands", label: "Top Brands" },
  { key: "nearby-stores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
];

interface Props {
  active: ShopTab;
  onChange: (tab: ShopTab) => void;
}

export function ShopTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1" role="tablist" aria-label="Shop sections">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-muted hover:border-brand/40"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}