import jsPDF from "jspdf";
import { theme } from "./theme";

export function title(pdf: jsPDF, text: string, y: number) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(theme.heading);
  pdf.setTextColor(theme.black);

  pdf.text(text, theme.margin, y);
}

export function label(pdf: jsPDF, text: string, y: number) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(theme.body);

  pdf.text(text, theme.margin, y);
}

export function value(
  pdf: jsPDF,
  text: string,
  y: number
) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(theme.body);

  pdf.text(text, 75, y);
}

export function divider(pdf: jsPDF, y: number) {
  pdf.setDrawColor(220);

  pdf.line(
    theme.margin,
    y,
    210 - theme.margin,
    y
  );
}