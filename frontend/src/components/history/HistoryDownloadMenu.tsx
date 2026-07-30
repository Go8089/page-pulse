import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { exportReport } from "../../lib/export";
import type { AuditReport } from "../../types/audit";

type Props = {
  url: string;
  score: number;
  report: AuditReport;
};

export default function HistoryDownloadMenu({
  url,
  score,
  report,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () =>
      window.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  function download(
    format: "pdf" | "json" | "txt" | "docx"
  ) {
    exportReport(
      format,
      url,
      score,
      report
    );

    setOpen(false);
  }

  return (
    <div
      className="relative"
      ref={ref}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 transition hover:border-sky-500"
      >
        <Download size={16} />

        Download

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-white/10 bg-zinc-950 shadow-xl">

          <button
            onClick={() => download("pdf")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            PDF
          </button>

          <button
            onClick={() => download("docx")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            Word (.docx)
          </button>

          <button
            onClick={() => download("json")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            JSON
          </button>

          <button
            onClick={() => download("txt")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            TXT
          </button>

        </div>
      )}
    </div>
  );
}