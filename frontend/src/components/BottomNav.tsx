const TABS = [
    { key: "home", label: "Home" },
    { key: "shop", label: "Shop" },
    { key: "portfolio", label: "Portfolio" },
    { key: "profile", label: "Profile" },
  ] as const;
  
  export function BottomNav({ active = "shop" }: { active?: (typeof TABS)[number]["key"] }) {
    return (
      <nav className="flex shrink-0 items-center justify-around border-t border-line bg-surface py-2.5">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              className={`flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium ${
                isActive ? "text-brand" : "text-muted"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-brand" : "bg-transparent"}`} aria-hidden />
              {tab.label}
            </button>
          );
        })}
      </nav>
    );
  }