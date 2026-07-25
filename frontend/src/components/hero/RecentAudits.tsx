type Props = {
  audits: string[];
  onSelect: (url: string) => void;
};

export default function RecentAudits({
  audits,
  onSelect,
}: Props) {
  if (audits.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-sm uppercase tracking-wide text-zinc-500">
        Recent Audits
      </h3>

      <div className="flex flex-wrap gap-3">
        {audits.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-sky-500/30 hover:bg-zinc-900"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}