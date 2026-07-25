import { Search, Loader2 } from "lucide-react";

type SearchBarProps = {
  url: string;
  setUrl: (value: string) => void;
  loading: boolean;
  onAudit: (url: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  error: string;
};

export default function SearchBar({
  url,
  setUrl,
  loading,
  onAudit,
  inputRef
}: SearchBarProps) {
 function handleAudit() {
  const cleaned = url.trim();

  if (!cleaned) return;

  const finalUrl =
    cleaned.startsWith("http://") || cleaned.startsWith("https://")
      ? cleaned
      : `https://${cleaned}`;

  setUrl(finalUrl);
  onAudit(finalUrl);
}

  return (
  <>
   <div className="group flex h-14 items-center rounded-2xl border border-white/10 bg-zinc-950 px-5 shadow-xl transition-all duration-300 focus-within:border-sky-500/40 focus-within:ring-4 focus-within:ring-sky-500/10">
      <Search
  size={18}
  className="mr-3 text-zinc-500 transition duration-300 group-focus-within:text-white"
/>

      <input
        ref={inputRef}
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAudit();
        }}
        placeholder="Search any website..."
        className="flex-1 bg-transparent text-base font-medium text-white placeholder:text-zinc-500 focus:outline-none"
/>

      <button
        onClick={handleAudit}
        disabled={loading}
        className="rounded-2xl bg-white px-2 py-2 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-zinc-200 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Analyze"
        )}
      </button>
    </div>

    <p className="mt-3 text-center text-xs text-zinc-600">
      Press{" "}
      <kbd className="rounded border border-white/10 bg-zinc-900 px-2 py-1">
        /
      </kbd>{" "}
      to search •{" "}
      <kbd className="rounded border border-white/10 bg-zinc-900 px-2 py-1">
        Ctrl+Enter
      </kbd>{" "}
      to analyze
    </p>
  </>
);
}