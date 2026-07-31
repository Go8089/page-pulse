import type { AuditReport } from "../../types/audit";
import { exportReport } from "../../lib/export";
import { useState } from "react";
import { ChevronDown, Download } from "lucide-react";

type Props = {
  url: string;
  score: number;
  report: AuditReport;
};

export default function DownloadMenu({
  url,
  score,
  report,
}: Props) {
  const [open, setOpen] = useState(false);

  async function handleDownload(
    type: "pdf" | "json" | "txt" | "docx"
  ) {
    setOpen(false);

    try {
      await exportReport(
        type,
        url,
        score,
        report
      );
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 transition hover:border-sky-500"
      >
        <Download size={16} />

        Download

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-48
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-zinc-950
            shadow-xl
          "
        >
          <button
            onClick={() => handleDownload("pdf")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            PDF
          </button>

          <button
            onClick={() => handleDownload("json")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            JSON
          </button>

          <button
            onClick={() => handleDownload("txt")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            TXT
          </button>

          <button
            onClick={() => handleDownload("docx")}
            className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
          >
            Word (.docx)
          </button>
        </div>
      )}
    </div>
  );
}