import type { AuditReport } from "../../types/audit";

type Props = {
  report: AuditReport;
};

type ScoreItem = {
  title: string;
  score: number;
  description: string;
};

export default function ScoreBreakdown({
  report,
}: Props) {
  const performance =
    report.response_time_ms <= 300
      ? 100
      : report.response_time_ms <= 800
      ? 90
      : report.response_time_ms <= 1500
      ? 75
      : 55;

  const seo = Math.max(
    0,
    100 -
      (report.meta_description ? 0 : 15) -
      (report.h1_count === 0 ? 15 : 0) -
      (report.title ? 0 : 20)
  );

  const accessibility = Math.max(
    0,
    100 - report.images_missing_alt * 8
  );

  const scores: ScoreItem[] = [
    {
      title: "Performance",
      score: performance,
      description: `${report.response_time_ms} ms response time`,
    },
    {
      title: "SEO",
      score: seo,
      description: report.meta_description
        ? "Metadata configured"
        : "Metadata needs attention",
    },
    {
      title: "Accessibility",
      score: accessibility,
      description:
        report.images_missing_alt === 0
          ? "No missing ALT attributes"
          : `${report.images_missing_alt} missing ALT attributes`,
    },
  ];

  function getLabel(score: number) {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Score Breakdown
        </h2>

        <p className="mt-2 text-zinc-500">
          Individual category scores calculated from this audit.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {scores.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {item.description}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-sky-400">
                  {item.score}
                </p>

                <p className="text-xs text-zinc-500">
                  /100
                </p>
              </div>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-sky-400 transition-all duration-700"
                style={{
                  width: `${item.score}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-zinc-400">
              {getLabel(item.score)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}