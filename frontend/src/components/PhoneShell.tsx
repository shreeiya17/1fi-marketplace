import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#0d1a16] p-0 sm:p-6">
      <div className="flex h-dvh w-full flex-col overflow-hidden bg-canvas sm:h-[860px] sm:max-w-[420px] sm:rounded-[2.5rem] sm:border-8 sm:border-[#0d1a16] sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}