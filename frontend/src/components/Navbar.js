import React from "react";
export default function Navbar() {
    return (React.createElement("header", { className: "mb-12 flex items-center justify-between border-b border-slate-200 pb-6" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-4xl font-bold tracking-tight" }, "Page Pulse"),
            React.createElement("p", { className: "mt-2 text-slate-500" }, "Audit any website in seconds.")),
        React.createElement("span", { className: "rounded-full border border-slate-300 px-4 py-2 text-sm font-medium" }, "v1.0")));
}
