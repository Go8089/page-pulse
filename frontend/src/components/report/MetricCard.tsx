import { motion } from "framer-motion";
type MetricCardProps = {
  title: string;
  value: string | number;
  status: "Healthy" | "Warning" | "Error";
  description: string;
};

export default function MetricCard({
  title,
  value,
  status,
  description,
}: MetricCardProps) {
  const badge =
    status === "Healthy"
      ? "bg-green-500/10 text-green-400"
      : status === "Warning"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-red-500/10 text-red-400";

  return (
    <motion.div
  variants={{
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }}
  transition={{
    duration: 0.35,
  }}
  className="
h-full
rounded-3xl
border
border-white/10
bg-zinc-950/60
p-6
transition-all
duration-300
hover:-translate-y-1
hover:border-sky-500/30
hover:shadow-[0_0_40px_rgba(56,189,248,.12)]
"
>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-400">
          {title}
        </h3>

        <span className={`rounded-full px-3 py-1 text-xs ${badge}`}>
          {status}
        </span>
      </div>

      <p className="mt-5 text-4xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-3 text-sm text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
}