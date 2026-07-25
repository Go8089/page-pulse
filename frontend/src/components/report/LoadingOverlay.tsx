import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  "Fetching HTML",
  "Checking Metadata",
  "Parsing Content",
  "Calculating Score",
];

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-white" />

          <h2 className="text-2xl font-semibold">
            Analyzing Website
          </h2>
        </div>

        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.3,
              }}
              className="flex items-center gap-3 text-zinc-300"
            >
              <div className="h-2 w-2 rounded-full bg-white" />
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}