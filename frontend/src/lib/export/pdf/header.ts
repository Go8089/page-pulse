import jsPDF from "jspdf";
import { theme } from "./theme";

export function addHeader(
  pdf: jsPDF
) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(theme.primary);

  pdf.text(
    "PagePulse Website Audit Report",
    theme.margin,
    12
  );

  pdf.setDrawColor(220);

  pdf.line(
    theme.margin,
    16,
    pageWidth - theme.margin,
    16
  );
}