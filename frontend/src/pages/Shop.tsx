import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { EmptyState } from "../components/EmptyState";
import { HeroBanner } from "../components/HeroBanner";
import { MarketplaceGrid } from "../components/MarketplaceGrid";
import { SearchBar } from "../components/SearchBar";
import { ShopTabs } from "../components/ShopTabs";
import type { ShopTab } from "../components/ShopTabs";

export function Shop() {
  const [tab, setTab] = useState<ShopTab>("marketplace");
  const [query, setQuery] = useState("");

  return (
    <>
      <AppBar title="Shop" />
      <div className="flex-1 overflow-y-auto">
        <HeroBanner />
        <div className="mt-4">
          <ShopTabs active={tab} onChange={setTab} />
        </div>

        {tab === "marketplace" && <SearchBar value={query} onChange={setQuery} />}

        <div className="flex flex-col">
          {tab === "top-brands" && (
            <EmptyState title="Top Brands is on its way" description="Curated brand storefronts will show up here soon." />
          )}
          {tab === "nearby-stores" && (
            <EmptyState title="Nearby Stores is on its way" description="We'll show partner stores near you once this ships." />
          )}
          {tab === "marketplace" && <MarketplaceGrid query={query} />}
        </div>
      </div>

      <BottomNav active="shop" />
    </>
  );
}