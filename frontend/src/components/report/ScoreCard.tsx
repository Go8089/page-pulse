import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import type { AuditReport } from "../../types/audit";

type Props = {
  score: number;
  report: AuditReport;
};

export default function ScoreCard({
  score,
  report,
}: Props) {
  const color =
    score >= 90
      ? "#22c55e"
      : score >= 75
      ? "#3b82f6"
      : score >= 50
      ? "#f59e0b"
      : "#ef4444";

  const label =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Good"
      : score >= 50
      ? "Fair"
      : "Needs Improvement";

  const checks = [
    {
      label: "SEO",
      ok:
        report.title.trim().length > 0 &&
        report.meta_description.trim().length > 0,
    },
    {
      label: "Accessibility",
      ok: report.images_missing_alt === 0,
    },
    {
      label: "Structure",
      ok: report.h1_count === 1,
    },
    {
      label: "Performance",
      ok: report.response_time_ms < 1000,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className="
        mb-12
        rounded-3xl
        border
        border-white/10
        bg-zinc-950/70
        p-10
        shadow-xl
        backdrop-blur
      "
    >
      <div className="flex flex-col items-center">

        <div className="relative h-44 w-44">

          <CircularProgressbar
            value={score}
            text=""
            styles={buildStyles({
              pathColor: color,
              trailColor: "#27272a",
            })}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span
              className="text-5xl font-bold tracking-tight"
              style={{ color }}
            >
              <CountUp
                end={score}
                duration={1.4}
              />
            </span>

            <span className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
              Score
            </span>

          </div>

        </div>

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          Overall Score
        </h2>

        <p
          className="mt-2 text-lg font-medium"
          style={{ color }}
        >
          {label}
        </p>

        <p className="mt-3 max-w-md text-center text-zinc-400">
          Website health based on SEO, accessibility,
          metadata, content structure and technical analysis.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">

          {checks.map((check) => (
            <span
              key={check.label}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                check.ok
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {check.ok ? "✓" : "✕"} {check.label}
            </span>
          ))}

        </div>

      </div>
    </motion.div>
  );
}