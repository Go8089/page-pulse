import type { AuditReport } from "../../types/audit";

import ReportHeader from "./ReportHeader";
import ExecutiveSummary from "./ExecutiveSummary";
import ScoreBreakdown from "./ScoreBreakdown";
import ScoreCard from "./ScoreCard";
import MetricsGrid from "./MetricsGrid";
import Recommendations from "./Recommendations";
import ReportSection from "./ReportSection";
import InfoCard from "./InfoCard";

type Props = {
  report: AuditReport;
  url: string;
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

  const finalScore = Math.max(
    0,
    Math.min(100, score)
  );

  return (
    <section className="relative mx-auto mb-24 mt-16 max-w-6xl px-6">

      <div className="pointer-events-none absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[220px]" />

      </div>

      <div className="space-y-10">
       <ReportHeader
  url={url}
  report={report}
  score={finalScore}
/>

<ExecutiveSummary
  score={finalScore}
  report={report}
/>

<ScoreBreakdown
  report={report}
/>

<ScoreCard
  score={finalScore}
  report={report}
/>

<ReportSection title="Performance">

  <MetricsGrid report={report} />

</ReportSection>

<ReportSection title="SEO Analysis">

  <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60">

    <table className="w-full">

      <tbody>

        <tr className="border-b border-white/10">
          <td className="px-6 py-4 text-zinc-500">
            Page Title
          </td>

          <td className="px-6 py-4 text-right font-medium">
            {report.title || "Not Found"}
          </td>
        </tr>

        <tr className="border-b border-white/10">
          <td className="px-6 py-4 text-zinc-500">
            Meta Description
          </td>

          <td className="px-6 py-4 text-right">
            {report.meta_description || "Missing"}
          </td>
        </tr>

        <tr className="border-b border-white/10">
          <td className="px-6 py-4 text-zinc-500">
            H1 Count
          </td>

          <td className="px-6 py-4 text-right">
            {report.h1_count}
          </td>
        </tr>

        <tr>
          <td className="px-6 py-4 text-zinc-500">
            Word Count
          </td>

          <td className="px-6 py-4 text-right">
            {report.word_count}
          </td>
        </tr>

      </tbody>

    </table>

  </div>

</ReportSection>

<ReportSection title="Accessibility">

  <div className="grid gap-5 md:grid-cols-2">

    <InfoCard
      title="Images Missing ALT"
      value={report.images_missing_alt}
    />

    <InfoCard
      title="Accessibility Status"
      value={
        report.images_missing_alt === 0
          ? "Good"
          : "Needs Improvement"
      }
    />

  </div>

</ReportSection>

<ReportSection title="Recommendations">

  <Recommendations
    report={report}
  />

</ReportSection> 
      </div>

    </section>
  );
}