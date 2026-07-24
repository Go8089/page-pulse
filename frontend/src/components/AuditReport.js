import React from "react";
import ReportCard from "./ReportCard";
import { BadgeCheck, Clock3, Heading, FileText, Image, FileDigit, } from "lucide-react";
export default function AuditReport({ report }) {
    return (React.createElement("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8" },
        React.createElement("div", { className: `rounded-xl p-5 shadow text-white ${report.http_status < 300
                ? "bg-green-600"
                : report.http_status < 400
                    ? "bg-blue-600"
                    : report.http_status < 500
                        ? "bg-yellow-500"
                        : "bg-red-600"}` },
            React.createElement("h3", { className: "text-sm" }, "HTTP Status"),
            React.createElement("p", { className: "mt-2 text-3xl font-bold" }, report.http_status)),
        React.createElement(ReportCard, { title: "HTTP Status", value: report.http_status, icon: BadgeCheck }),
        React.createElement(ReportCard, { title: "Response Time", value: `${report.response_time_ms} ms`, icon: Clock3 }),
        React.createElement(ReportCard, { title: "Title", value: report.title, icon: Heading }),
        React.createElement(ReportCard, { title: "Meta Description", value: report.meta_description || "-", icon: FileText }),
        React.createElement(ReportCard, { title: "Missing Alt", value: report.images_missing_alt, icon: Image }),
        React.createElement(ReportCard, { title: "Word Count", value: report.word_count, icon: FileDigit })));
}
