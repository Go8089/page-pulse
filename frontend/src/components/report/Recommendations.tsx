import type { AuditReport } from "../../types/audit";

type Props = {
  report: AuditReport;
};

type Recommendation = {
  priority: "High" | "Medium" | "Low";
  title: string;
  impact: string;
  fix: string;
};

export default function Recommendations({
  report,
}: Props) {
  const recommendations: Recommendation[] = [];

  if (!report.meta_description) {
    recommendations.push({
      priority: "High",
      title: "Missing Meta Description",
      impact:
        "Search engines may generate poor snippets, reducing click-through rate.",
      fix:
        "Add a unique meta description between 120–160 characters.",
    });
  }

  if (report.h1_count === 0) {
    recommendations.push({
      priority: "High",
      title: "No H1 Heading",
      impact:
        "Search engines and screen readers rely on a clear primary heading.",
      fix:
        "Add one descriptive H1 element representing the page topic.",
    });
  }

  if (report.images_missing_alt > 0) {
    recommendations.push({
      priority: "Medium",
      title: "Images Missing ALT Text",
      impact:
        "Screen readers cannot describe images and accessibility suffers.",
      fix:
        `Add ALT text to ${report.images_missing_alt} image(s).`,
    });
  }

  if (report.response_time_ms > 1000) {
    recommendations.push({
      priority: "Medium",
      title: "Slow Response Time",
      impact:
        "Users may abandon the page before it finishes loading.",
      fix:
        "Enable caching, optimize assets, and reduce server response time.",
    });
  }

  if (report.word_count < 200) {
    recommendations.push({
      priority: "Low",
      title: "Low Content Volume",
      impact:
        "Pages with little content are harder for search engines to understand.",
      fix:
        "Expand useful, original content where appropriate.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: "Low",
      title: "No Critical Issues Found",
      impact:
        "The audit did not detect any major SEO, accessibility, or performance issues.",
      fix:
        "Continue monitoring and re-audit after future updates.",
    });
  }

  const priorityColor = {
    High: "text-red-400 border-red-500/20",
    Medium: "text-yellow-400 border-yellow-500/20",
    Low: "text-sky-400 border-sky-500/20",
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="mt-2 text-zinc-500">
          Suggested improvements based on this audit.
        </p>
      </div>

      <div className="space-y-5">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6"
          >
            <div className="flex items-center justify-between">

              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityColor[item.priority]}`}
              >
                {item.priority}
              </span>

            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-2">

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Impact
                </p>

                <p className="mt-2 leading-7 text-zinc-300">
                  {item.impact}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Suggested Fix
                </p>

                <p className="mt-2 leading-7 text-zinc-300">
                  {item.fix}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
}