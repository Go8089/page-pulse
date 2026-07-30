import type { SavedAudit } from "../../lib/history";

type Props = {
  audits: SavedAudit[];
};

export default function HistoryStats({ audits }: Props) {
  const total = audits.length;

  const average =
    total === 0
      ? 0
      : Math.round(
          audits.reduce((sum, a) => sum + a.score, 0) / total
        );

  const best =
    total === 0
      ? 0
      : Math.max(...audits.map((a) => a.score));

  const fastest =
    total === 0
      ? 0
      : Math.min(
          ...audits.map(
            (a) => a.report.response_time_ms
          )
        );

  const cards = [
    {
      title: "Total Reports",
      value: total,
    },
    {
      title: "Average Score",
      value: average,
    },
    {
      title: "Best Score",
      value: best,
    },
    {
      title: "Fastest Audit",
      value: `${fastest} ms`,
    },
  ];

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6"
        >
          <p className="text-sm text-zinc-500">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}