export default function ReportSkeleton() {
  return (
    <div className="mx-auto mt-16 max-w-6xl animate-pulse space-y-6">

      <div className="h-10 w-64 rounded bg-zinc-900" />

      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-3xl bg-zinc-900"
          />
        ))}
      </div>

      <div className="h-80 rounded-3xl bg-zinc-900" />
    </div>
  );
}