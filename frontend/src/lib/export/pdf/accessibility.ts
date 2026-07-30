import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { theme } from "./theme";

type AccessibilityData = {
  imagesMissingAlt: number;
};

export function addAccessibility(
  pdf: jsPDF,
  data: AccessibilityData
) {
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(theme.black);

  pdf.text("Accessibility Analysis", 20, 25);

  const status =
    data.imagesMissingAlt === 0
      ? "Pass"
      : "Needs Improvement";

  autoTable(pdf, {
    startY: 35,

    head: [["Metric", "Result", "Status"]],

    body: [
      [
        "Images Missing ALT",
        String(data.imagesMissingAlt),
        status,
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 11,
      cellPadding: 4,
      lineWidth: 0.1,
      lineColor: [210, 210, 210],
    },

    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
  });
}