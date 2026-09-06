export function HeroBanner() {
    return (
      <div className="mx-5 mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-strong p-5 text-white">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
          ✦ No-cost EMIs
        </span>
        <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight">
          Shop today,
          <br />
          Pay later using
          <br />
          Mutual funds.
        </h2>
        <p className="mt-2 text-sm text-white/80">No credit score required. No interest. Backed by your investments.</p>
      </div>
    );
  }