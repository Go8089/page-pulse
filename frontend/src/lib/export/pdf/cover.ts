import jsPDF from "jspdf";
import { theme } from "./theme";

type CoverData = {
  url: string;
  score: number;
  generatedAt: string;
   reportId: string;
};

export function addCover(pdf: jsPDF, data: CoverData) {
  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(theme.primary);

  pdf.text("PAGEPULSE", 105, 35, { align: "center" });

  // Subtitle
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(16);
  pdf.setTextColor(theme.gray);

  pdf.text("Website Audit Report", 105, 45, {
    align: "center",
  });

  // Divider
  pdf.setDrawColor(220);
  pdf.line(20, 55, 190, 55);

  // Website
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(theme.black);

  pdf.text("Website", 20, 75);

  pdf.setFont("helvetica", "normal");
  pdf.text(data.url, 20, 83);

  // Date
  pdf.setFont("helvetica", "bold");
  pdf.text("Generated", 20, 105);

  pdf.setFont("helvetica", "normal");
  pdf.text(data.generatedAt, 20, 113);

pdf.setFont("helvetica", "bold");
pdf.text("Report ID", 20, 135);

pdf.setFont("helvetica", "normal");
pdf.text(data.reportId, 20, 143);  

  // Score Box
  pdf.setFillColor(14, 165, 233);

  pdf.roundedRect(20, 140, 170, 45, 4, 4, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);

  pdf.text("Overall Score", 105, 155, {
    align: "center",
  });

  pdf.setFontSize(30);

  pdf.text(`${data.score}/100`, 105, 173, {
    align: "center",
  });
}