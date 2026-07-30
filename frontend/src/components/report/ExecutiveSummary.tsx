import type { AuditReport } from "../../types/audit";

type Props = {
  score: number;
  report: AuditReport;
};

export default function ExecutiveSummary({
  score,
  report,
}: Props) {
  const health =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Good"
      : score >= 50
      ? "Fair"
      : "Poor";

  const seo =
    report.meta_description
      ? "Configured"
      : "Needs Attention";

  const accessibility =
    report.images_missing_alt === 0
      ? "Good"
      : "Needs Attention";

  const performance =
    report.response_time_ms <= 500
      ? "Fast"
      : report.response_time_ms <= 1500
      ? "Average"
      : "Slow";

  const cards = [
    {
      title: "Overall Health",
      value: health,
      subtitle: `${score}/100`,
    },
    {
      title: "Performance",
      value: performance,
      subtitle: `${report.response_time_ms} ms`,
    },
    {
      title: "SEO",
      value: seo,
      subtitle: report.title
        ? "Title Found"
        : "Missing Title",
    },
    {
      title: "Accessibility",
      value: accessibility,
      subtitle:
        report.images_missing_alt === 0
          ? "No Missing ALT"
          : `${report.images_missing_alt} Missing ALT`,
    },
  ];

  return (
    <section className="mb-10">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">
          Executive Summary
        </h2>

        <p className="mt-2 text-zinc-500">
          A quick overview of your website audit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 transition hover:border-sky-500/30"
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {card.title}
            </p>

            <h3 className="mt-4 text-2xl font-semibold">
              {card.value}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}