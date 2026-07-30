import jsPDF from "jspdf";
import { addCover } from "./cover";
import { addSummary } from "./summary";
import type { AuditReport } from "../../../types/audit";
import { addSeo } from "./seo";
import { addPerformance } from "./performance";
import { addAccessibility } from "./accessibility";
import { addRecommendations } from "./recommendations";
import { addFooter } from "./footer";
import { addHeader } from "./header";

export async function exportPdf(
  url: string,
  score: number,
  report: AuditReport
) {
  const pdf = new jsPDF("p", "mm", "a4");

  const reportId = crypto.randomUUID()
    .slice(0, 8)
    .toUpperCase();

  addCover(pdf, {
    url,
    score,
    generatedAt: new Date().toLocaleString(),
    reportId,
  });

  addSummary(pdf, {
    score,
    httpStatus: report.http_status,
    responseTime: report.response_time_ms,
    title: report.title,
    wordCount: report.word_count,
    h1Count: report.h1_count,
    imagesMissingAlt: report.images_missing_alt,
  });

  addPerformance(pdf, {
    httpStatus: report.http_status,
    responseTime: report.response_time_ms,
  });

  addSeo(pdf, {
    title: report.title,
    metaDescription: report.meta_description,
    h1Count: report.h1_count,
    wordCount: report.word_count,
  });

  addAccessibility(pdf, {
    imagesMissingAlt: report.images_missing_alt,
  });

  addRecommendations(pdf, report);

  // AFTER all pages are created
  const totalPages = pdf.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addHeader(pdf);
    addFooter(pdf, i, totalPages);
  }

  pdf.save(`PagePulse-${reportId}.pdf`);
}