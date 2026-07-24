import { useState } from "react";
import AuditForm from "./components/AuditForm";
import AuditReport from "./components/AuditReport";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";
function App() {
    const [report, setReport] = useState(null);
    return (React.createElement("main", { className: "min-h-screen bg-slate-100" },
        React.createElement("div", { className: "mx-auto max-w-6xl px-6 py-12" },
            React.createElement(Navbar, null),
            React.createElement("div", { className: "rounded-xl bg-white p-8 shadow-lg" },
                React.createElement(AuditForm, { onSuccess: setReport })),
            report ? (React.createElement(AuditReport, { report: report })) : (React.createElement("div", { className: "mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500" },
                "Enter a website URL above and click ",
                React.createElement("strong", null, "Audit Website"),
                " to view the analysis.")),
            React.createElement(Footer, null))));
}
export default App;
