import type { AuditReport } from "../types/audit";
import jsPDF from "jspdf";

export function downloadJSON(report: AuditReport, url: string) {
  const blob = new Blob(
    [JSON.stringify(report, null, 2)],
    { type: "application/json" }
  );

  const link = document.createElement("a");

  const hostname = new URL(url).hostname.replace(/\./g, "-");

  link.href = URL.createObjectURL(blob);
  link.download = `${hostname}-audit-report.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(link.href);
}

export function downloadPDF(report: AuditReport, url: string) {
  const pdf = new jsPDF();

  let y = 20;

  pdf.setFontSize(20);
  pdf.text("PagePulse Audit Report", 20, y);

  y += 15;

  pdf.setFontSize(12);

  pdf.text(`Website: ${url}`, 20, y);
  y += 10;

  pdf.text(`Title: ${report.title}`, 20, y);
  y += 10;

  pdf.text(`HTTP Status: ${report.http_status}`, 20, y);
  y += 10;

  pdf.text(`Response Time: ${report.response_time_ms} ms`, 20, y);
  y += 10;

  pdf.text(`Word Count: ${report.word_count}`, 20, y);
  y += 10;

  pdf.text(`H1 Count: ${report.h1_count}`, 20, y);
  y += 10;

  pdf.text(
    `Images Missing ALT: ${report.images_missing_alt}`,
    20,
    y
  );

  y += 15;

  pdf.setFontSize(14);
  pdf.text("Meta Description", 20, y);

  y += 10;

  pdf.setFontSize(11);

  pdf.text(
    report.meta_description || "Not Found",
    20,
    y,
    {
      maxWidth: 170,
    }
  );

  const hostname = new URL(url).hostname.replace(/\./g, "-");

  pdf.save(`${hostname}-audit-report.pdf`);
}