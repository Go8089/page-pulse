import type { AuditReport } from "../../types/audit";

import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";

export async function exportDocx(
  url: string,
  score: number,
  report: AuditReport
) {
  const doc = new Document({
    sections: [
      {
        children: [

          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [
              new TextRun("PagePulse Website Audit Report"),
            ],
          }),

          new Paragraph(""),

          new Paragraph({
            children: [
              new TextRun({
                text: "Website: ",
                bold: true,
              }),
              new TextRun(url),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Overall Score: ",
                bold: true,
              }),
              new TextRun(`${score}/100`),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Generated: ",
                bold: true,
              }),
              new TextRun(
                new Date().toLocaleString()
              ),
            ],
          }),

          new Paragraph(""),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            text: "Audit Metrics",
          }),

          new Table({
            rows: [

              row(
                "HTTP Status",
                report.http_status
              ),

              row(
                "Response Time",
                `${report.response_time_ms} ms`
              ),

              row(
                "Page Title",
                report.title
              ),

              row(
                "Meta Description",
                report.meta_description ||
                  "Missing"
              ),

              row(
                "H1 Count",
                report.h1_count
              ),

              row(
                "Images Missing ALT",
                report.images_missing_alt
              ),

              row(
                "Word Count",
                report.word_count
              ),
            ],
          }),

          new Paragraph(""),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            text: "Recommendations",
          }),

          recommendation(
            report.meta_description
              ? "✓ Meta description present."
              : "Add a meta description."
          ),

          recommendation(
            report.images_missing_alt === 0
              ? "✓ All images include ALT text."
              : `Add ALT text to ${report.images_missing_alt} image(s).`
          ),

          recommendation(
            report.h1_count > 0
              ? "✓ H1 heading detected."
              : "Add an H1 heading."
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, "pagepulse-report.docx");
}

function row(
  label: string,
  value: unknown
) {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: label,
                bold: true,
              }),
            ],
          }),
        ],
      }),

      new TableCell({
        children: [
          new Paragraph(String(value)),
        ],
      }),
    ],
  });
}

function recommendation(
  text: string
) {
  return new Paragraph({
    bullet: {
      level: 0,
    },
    children: [
      new TextRun(text),
    ],
  });
}