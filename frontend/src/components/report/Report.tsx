import type { AuditReport } from "../../types/audit";
import InfoCard from "./InfoCard";
import MetricsGrid from "./MetricsGrid";
import ReportHeader from "./ReportHeader";
import ReportSection from "./ReportSection";
import ScoreCard from "./ScoreCard";

type Props = {
  report: AuditReport;
  url: string;
  onRunAgain?: () => void;
};

export default function Report({
  report,
  url,
}: Props) {
  const score =
    100 -
    report.images_missing_alt * 5 -
    (report.meta_description ? 0 : 10) -
    (report.h1_count === 0 ? 10 : 0);

  const finalScore = Math.max(0, Math.min(100, score));

  return (
    <section className="mx-auto mt-16 mb-24 max-w-7xl px-6 lg:px-10">

      <ReportHeader
  url={url}
  report={report}
/>

      <div className="space-y-10">

 <ScoreCard
  score={finalScore}
  report={report}
/>

  <ReportSection title="Performance">
    <MetricsGrid report={report} />
  </ReportSection>

  <ReportSection title="Metadata">
  <div className="grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        Page Title
      </p>

      <p className="mt-3 text-lg font-medium text-white">
        {report.title || "Not Found"}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        Meta Description
      </p>

      <p className="mt-3 leading-7 text-zinc-300">
        {report.meta_description || "No meta description found."}
      </p>
    </div>

  </div>
</ReportSection>

  <ReportSection title="Technical Details">

  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

    <InfoCard
      title="HTTP Status"
      value={report.http_status}
    />

    <InfoCard
      title="H1 Count"
      value={report.h1_count}
    />

    <InfoCard
      title="Missing ALT"
      value={report.images_missing_alt}
    />

    <InfoCard
      title="Word Count"
      value={report.word_count}
    />

    <InfoCard
      title="Response Time"
      value={`${report.response_time_ms} ms`}
    />

  </div>

</ReportSection>

</div>

    </section>
  );
}
