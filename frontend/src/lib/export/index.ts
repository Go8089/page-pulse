import type { AuditReport } from "../../types/audit";

import { exportPdf } from "./pdf";


export type ExportFormat =
  | "pdf"
  | "json"
  | "txt"
  | "docx";

export async function exportReport(
  format: ExportFormat,
  url: string,
  score: number,
  report: AuditReport
) {
  switch (format) {
    case "pdf":
      return exportPdf(url, score, report);

  }
}