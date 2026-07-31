import type { AuditReport } from "../../types/audit";
import { downloadFile } from "./utils";

export function exportTxt(
  url: string,
  score: number,
  report: AuditReport
) {
  const text = `
PAGEPULSE WEBSITE AUDIT

URL:
${url}

Overall Score:
${score}/100

HTTP Status:
${report.http_status}

Response Time:
${report.response_time_ms} ms

Page Title:
${report.title}

Meta Description:
${report.meta_description}

H1 Count:
${report.h1_count}

Missing ALT:
${report.images_missing_alt}

Word Count:
${report.word_count}

Generated:
${new Date().toLocaleString()}
`;

  downloadFile(
    new Blob(
      [text],
      {
        type: "text/plain",
      }
    ),
    "pagepulse-report.txt"
  );
}