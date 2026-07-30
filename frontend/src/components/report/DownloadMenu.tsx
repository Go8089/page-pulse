import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import { exportReport } from "@/lib/export";
import type { AuditReport } from "@/types/audit";

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:bg-zinc-900"
      >
        <Download size={16} />
        Download
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-zinc-950 shadow-xl">
          {["pdf", "docx", "json", "txt"].map((type) => (
            <button
              key={type}
              onClick={() => {
                exportReport(
                  type as any,
                  url,
                  score,
                  report
                );
                setOpen(false);
              }}
              className="block w-full px-4 py-3 text-left hover:bg-zinc-900"
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}