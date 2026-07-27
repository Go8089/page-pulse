import type { AuditReport } from "../../types/audit";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

type Props = {
  url: string;
  report: AuditReport;
};

export default function ReportHeader({ url, report }: Props) {
  async function copyReport() {
    await navigator.clipboard.writeText(
      JSON.stringify(report, null, 2)
    );

    toast.success("Report copied");
  }

  function exportReport() {
  const blob = new Blob(
    [JSON.stringify(report, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `pagepulse-report-${Date.now()}.json`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);

  toast.success("Report exported");
}

  return (
    <div className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Audit Report
        </h1>

        <p className="mt-2 text-zinc-500">
          {url}
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={copyReport}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-sky-500/30 hover:bg-zinc-900"
        >
          <Copy size={16} />
          Copy
        </button>

        <button
         onClick={exportReport}
         className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-sky-500/30 hover:bg-zinc-900"
        >
       <Download size={16} />
       Export
       </button>

      </div>
    </div>
  );
}