interface Props {
    value: string;
    onChange: (value: string) => void;
  }
  
  export function SearchBar({ value, onChange }: Props) {
    return (
      <div className="mx-5 mt-4 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search online stores..."
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </div>
    );
  }