import { motion } from "framer-motion";

const stats = [
  {
    value: "SEO",
    label: "Analysis",
  },
  {
    value: "A11Y",
    label: "Accessibility",
  },
  {
    value: "Meta",
    label: "Metadata",
  },
  {
    value: "JSON/PDF",
    label: "Export",
  },
];

export default function StatsSection() {
  return (
  <section id="features">
    <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5 text-center backdrop-blur"
        >
          <p className="text-2xl font-bold text-white">
            {stat.value}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
    </section>
  );
}