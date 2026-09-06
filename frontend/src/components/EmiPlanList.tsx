import type { EmiPlan } from "../lib/api";
import { formatInr } from "../lib/format";

interface Props {
  plans: EmiPlan[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function EmiPlanList({ plans, selectedId, onSelect }: Props) {
  const zeroInterest = plans.filter((p) => p.interestRate === 0);
  const extended = plans.filter((p) => p.interestRate > 0);

  return (
    <div className="flex flex-col gap-4">
      <PlanGroup title="0% interest" plans={zeroInterest} selectedId={selectedId} onSelect={onSelect} />
      <PlanGroup title="Extended tenure" plans={extended} selectedId={selectedId} onSelect={onSelect} />
    </div>
  );
}

function PlanGroup({
  title,
  plans,
  selectedId,
  onSelect,
}: {
  title: string;
  plans: EmiPlan[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (plans.length === 0) return null;

  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{title}</span>
      <div className="mt-2 flex flex-col gap-2">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedId;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              aria-pressed={isSelected}
              className={`flex items-center justify-between rounded-xl border bg-surface p-3.5 text-left transition-colors ${
                isSelected ? "border-brand" : "border-line"
              }`}
              style={isSelected ? { boxShadow: "inset 3px 0 0 var(--color-brand)" } : undefined}
            >
              <div>
                <p className="font-display text-sm font-bold text-ink">
                  {formatInr(plan.monthlyAmount)} <span className="font-body text-xs font-normal text-muted">/mo</span>
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {plan.tenureMonths} months · {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
                </p>
                {plan.cashbackAmount > 0 && (
                  <p className="mt-1 w-fit rounded-md bg-accent-soft px-1.5 py-0.5 text-[11px] font-medium text-accent">
                    Cashback of {formatInr(plan.cashbackAmount)}
                  </p>
                )}
              </div>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-brand bg-brand" : "border-line"
                }`}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}