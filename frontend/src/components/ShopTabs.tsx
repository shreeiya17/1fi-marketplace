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
    <div className="flex gap-6 overflow-x-auto border-b border-line px-5" role="tablist" aria-label="Shop sections">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
              isActive ? "border-brand text-brand" : "border-transparent text-muted"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}