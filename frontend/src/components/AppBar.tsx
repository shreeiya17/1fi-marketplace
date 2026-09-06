import type { ReactNode } from "react";

interface Props {
  title: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function AppBar({ title, onBack, trailing }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-line bg-surface px-5 py-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-canvas"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <h1 className="font-display flex-1 text-lg font-bold text-ink">{title}</h1>
      {trailing}
    </div>
  );
}