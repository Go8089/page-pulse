import jsPDF from "jspdf";
import { theme } from "./theme";
import type { AuditReport } from "../../../types/audit";

export function addRecommendations(
  pdf: jsPDF,
  report: AuditReport
) {
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(theme.black);

  pdf.text("Recommendations", 20, 25);

  const recommendations: string[] = [];

  // Meta Description
  if (!report.meta_description.trim()) {
    recommendations.push(
      "Add a meta description to improve search engine visibility."
    );
  }

  // H1
  if (report.h1_count === 0) {
    recommendations.push(
      "Add one primary H1 heading describing the page."
    );
  } else if (report.h1_count > 1) {
    recommendations.push(
      "Use a single H1 heading to improve document structure."
    );
  }

  // ALT
  if (report.images_missing_alt > 0) {
    recommendations.push(
      `Add ALT text to ${report.images_missing_alt} image(s).`
    );
  }

  // Word Count
  if (report.word_count < 300) {
    recommendations.push(
      "Increase page content for better SEO and user engagement."
    );
  }

  // Performance
  if (report.response_time_ms > 500) {
    recommendations.push(
      "Reduce server response time below 500 ms."
    );
  }

  // Perfect report
  if (recommendations.length === 0) {
    recommendations.push(
      "No major issues were detected. Continue monitoring website performance regularly."
    );
  }

  let y = 45;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  recommendations.forEach((item, index) => {
    pdf.text(`${index + 1}. ${item}`, 25, y, {
      maxWidth: 160,
    });

    y += 15;
  });
}