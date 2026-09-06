import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  home: (
    <path d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 001 1h4v-6h2v6h4a1 1 0 001-1v-9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shop: (
    <path
      d="M4 9l1-5h14l1 5M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M4 9h16M9 13a3 3 0 006 0"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "emi-dues": (
    <path
      d="M6 3h9l3 3v15a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM9 9h6M9 13h6M9 17h3"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  limit: (
    <path d="M4 16l5-6 4 4 7-9M14 5h6v6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  profile: (
    <path
      d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const TABS = [
  { key: "home", label: "Home" },
  { key: "shop", label: "Shop" },
  { key: "emi-dues", label: "EMI Dues" },
  { key: "limit", label: "Limit" },
  { key: "profile", label: "Profile" },
] as const;

export function BottomNav({ active = "shop" }: { active?: (typeof TABS)[number]["key"] }) {
  return (
    <nav className="flex shrink-0 items-center justify-around border-t border-line bg-surface py-2">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button key={tab.key} type="button" className="flex flex-col items-center gap-1 px-2 py-1">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                isActive ? "bg-brand-soft text-brand" : "text-muted"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {ICONS[tab.key]}
              </svg>
            </span>
            <span className={`text-[10px] font-medium ${isActive ? "text-brand" : "text-muted"}`}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}