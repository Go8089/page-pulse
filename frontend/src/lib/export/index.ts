import type { AuditReport } from "../../types/audit";

import { exportPdf } from "./pdf";
import { exportJson } from "./json";
import { exportTxt } from "./txt";
import { exportDocx } from "./docx";

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
      return exportPdf(
        url,
        score,
        report
      );

    case "json":
      return exportJson(
        url,
        score,
        report
      );

    case "txt":
      return exportTxt(
        url,
        score,
        report
      );

    case "docx":
      return exportDocx(
        url,
        score,
        report
      );
  }
}