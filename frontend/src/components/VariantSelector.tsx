import type { Variant, VariantType } from "../lib/api";

interface Props {
  label: string;
  type: VariantType;
  variants: Variant[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function VariantSelector({ label, type, variants, selectedId, onSelect }: Props) {
  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((v) => {
          const isSelected = v.id === selectedId;
          if (type === "COLOR") {
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelect(v.id)}
                aria-label={v.label}
                aria-pressed={isSelected}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-brand" : "border-transparent"
                }`}
              >
                <span className="h-6 w-6 rounded-full border border-line" style={{ backgroundColor: v.swatchHex ?? "#ccc" }} />
              </button>
            );
          }
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
                isSelected ? "border-brand bg-brand-soft text-brand-strong" : "border-line text-ink"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}