interface Props {
    title: string;
    description: string;
  }
  
  export function EmptyState({ title, description }: Props) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8v5m0 3.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-display text-base font-bold text-ink">{title}</h2>
        <p className="text-sm text-muted">{description}</p>
      </div>
    );
  }