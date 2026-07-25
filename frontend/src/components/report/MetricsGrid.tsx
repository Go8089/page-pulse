import type { AuditReport } from "../../types/audit";
import MetricCard from "./MetricCard";
import { motion } from "framer-motion";

type Props = {
  report: AuditReport;
};

export default function MetricsGrid({ report }: Props) {
  return (
    <motion.div
  className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }}
>
      <MetricCard
  title="HTTP Status"
  value={report.http_status}
  status={report.http_status === 200 ? "Healthy" : "Error"}
  description="Server response"
/>

<MetricCard
  title="Response Time"
  value={`${report.response_time_ms} ms`}
  status={report.response_time_ms < 500 ? "Healthy" : "Warning"}
  description="Page loading speed"
/>

<MetricCard
  title="Word Count"
  value={report.word_count}
  status={report.word_count > 300 ? "Healthy" : "Warning"}
  description="Content richness"
/>

<MetricCard
  title="Images Missing ALT"
  value={report.images_missing_alt}
  status={report.images_missing_alt === 0 ? "Healthy" : "Warning"}
  description="Accessibility"
/>
    </motion.div>
  );
}