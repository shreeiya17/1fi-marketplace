export function ProductGridSkeleton() {
    return (
      <div className="grid grid-cols-2 gap-3 px-5 py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="aspect-square bg-line/60" />
            <div className="space-y-2 p-3">
              <div className="h-2.5 w-1/2 rounded bg-line/60" />
              <div className="h-3 w-3/4 rounded bg-line/60" />
              <div className="h-3 w-1/3 rounded bg-line/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }