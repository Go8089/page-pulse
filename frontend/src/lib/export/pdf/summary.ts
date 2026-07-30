import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { theme } from "./theme";

type SummaryData = {
  score: number;
  httpStatus: number;
  responseTime: number;
  title: string;
  wordCount: number;
  h1Count: number;
  imagesMissingAlt: number;
};

export function addSummary(
  pdf: jsPDF,
  data: SummaryData
) 

{
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(theme.black);

  pdf.text("Executive Summary", 20, 25);

  autoTable(pdf, {
    startY: 35,

    head: [["Metric", "Value"]],

    body: [
      ["Overall Score", `${data.score}/100`],
      ["HTTP Status", `${data.httpStatus}`],
      ["Response Time", `${data.responseTime} ms`],
      ["Page Title", data.title],
      ["Word Count", `${data.wordCount}`],
      ["H1 Count", `${data.h1Count}`],
      ["Images Missing ALT", `${data.imagesMissingAlt}`],
    ],

    styles: {
      fontSize: 11,
      cellPadding: 4,
    },

    headStyles: {
      fillColor: [14, 165, 233],
      textColor: [255, 255, 255],
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });
}
