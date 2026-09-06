import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { EmptyState } from "../components/EmptyState";
import { ShopTabs } from "../components/ShopTabs";
import type { ShopTab } from "../components/ShopTabs";

export function Shop() {
  const [tab, setTab] = useState<ShopTab>("marketplace");

  return (
    <>
      <AppBar title="Shop" />
      <div className="flex shrink-0 flex-col gap-3 pt-3">
        <ShopTabs active={tab} onChange={setTab} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {tab === "top-brands" && (
          <EmptyState title="Top Brands is on its way" description="Curated brand storefronts will show up here soon." />
        )}
        {tab === "nearby-stores" && (
          <EmptyState title="Nearby Stores is on its way" description="We'll show partner stores near you once this ships." />
        )}
        {tab === "marketplace" && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted">Marketplace grid goes here</p>
          </div>
        )}
      </div>

      <BottomNav active="shop" />
    </>
  );
}