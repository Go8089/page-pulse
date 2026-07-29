import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/hero/Hero";
import Report from "../components/report/Report";
import LoadingOverlay from "../components/report/LoadingOverlay";
import ReportSkeleton from "../components/report/ReportSkeleton";
import { auditUrl } from "../api/audit";
import type { AuditReport } from "../types/audit";
import { saveRecentAudit } from "../lib/history";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setUrl("");
      }

      if (e.ctrlKey && e.key === "Enter") {
        if (url.trim()) {
          handleAudit(url);
        }
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [url]);

  async function handleAudit(inputUrl: string) {
    if (!inputUrl.trim()) return;

    try {
      setLoading(true);
      setError("");

      const result = await auditUrl(inputUrl);

      setReport(result);

      const score =
  100 -
  result.images_missing_alt * 5 -
  (result.meta_description ? 0 : 10) -
  (result.h1_count === 0 ? 10 : 0);

const finalScore = Math.max(
  0,
  Math.min(100, score)
);

saveRecentAudit({
  url: inputUrl.trim(),
  score: finalScore,
  report: result,
});
    } catch {
      setError("Failed to audit the website.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white antialiased">
      <Navbar />

      <motion.div
        animate={{
          y: report ? -80 : 0,
          scale: report ? 0.96 : 1,
        }}
        transition={{
          duration: 0.45,
          ease: "easeInOut",
        }}
      >
        <Hero
                  url={url}
                  setUrl={setUrl}
                  loading={loading}
                  onAudit={handleAudit}
                  collapsed={!!report}
                  inputRef={inputRef} error={error}        />
      </motion.div>

      

    {error && (
  <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
    <h3 className="text-lg font-semibold text-red-400">
      Audit Failed
    </h3>

    <p className="mt-2 text-zinc-400">
      {error}
    </p>
  </div>
)}  

     <AnimatePresence>
  {loading && (
    <>
      <LoadingOverlay />
      <ReportSkeleton />
    </>
  )}
</AnimatePresence>

      <motion.div
  layout
  transition={{ duration: 0.4 }}
>
  <AnimatePresence>
    {report && (
      <motion.div
        key="report"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Report
          report={report}
          url={url}
        />
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>

      <Footer />
    </div>
  );
}