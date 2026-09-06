interface Props {
    message: string;
    onRetry: () => void;
  }
  
  export function ErrorBanner({ message, onRetry }: Props) {
    return (
      <div className="mx-5 mt-4 flex flex-col items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <span>{message}</span>
        <button type="button" onClick={onRetry} className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">
          Try again
        </button>
      </div>
    );
  }