import React from "react";
export default function ReportCard({ title, value, icon: Icon, }) {
    return (React.createElement("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("p", { className: "text-sm font-medium text-slate-500" }, title),
            React.createElement(Icon, { size: 20, className: "text-slate-400" })),
        React.createElement("h2", { className: "mt-5 break-words text-3xl font-bold text-slate-900" }, value || "-")));
}
