import type { AuditReport } from "../../types/audit";
import { downloadFile } from "./utils";

export function exportJson(
  url: string,
  score: number,
  report: AuditReport
) {
  const payload = {
    reportId:
      crypto.randomUUID(),

    generatedAt:
      new Date().toISOString(),

    url,

    score,

    report,
  };

  downloadFile(
    new Blob(
      [
        JSON.stringify(
          payload,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    ),
    "pagepulse-report.json"
  );
}