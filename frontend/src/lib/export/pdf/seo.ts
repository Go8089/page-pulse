import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { theme } from "./theme";

type SeoData = {
  title: string;
  metaDescription: string;
  h1Count: number;
  wordCount: number;
};

export function addSeo(
  pdf: jsPDF,
  data: SeoData
) {
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(theme.black);

  pdf.text("SEO Analysis", 20, 25);

  autoTable(pdf, {
    startY: 35,

    head: [["Metric", "Result"]],

    body: [
      [
        "Page Title",
        data.title || "Not Found",
      ],
      [
        "Meta Description",
        data.metaDescription || "Not Found",
      ],
      [
        "H1 Count",
        String(data.h1Count),
      ],
      [
        "Word Count",
        String(data.wordCount),
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