import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type PerformanceData = {
  httpStatus: number;
  responseTime: number;
};

export function addPerformance(
  pdf: jsPDF,
  data: PerformanceData
) {
  pdf.addPage();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);

  pdf.text("Performance", 20, 25);

  autoTable(pdf, {
    startY: 35,

    head: [["Metric", "Result"]],

    body: [
      ["HTTP Status", String(data.httpStatus)],
      ["Response Time", `${data.responseTime} ms`],
    ],

    theme: "grid",

    styles: {
      fontSize: 11,
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