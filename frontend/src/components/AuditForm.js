import { useState } from "react";
import { auditUrl } from "../api/audit";
import Loader from "./Loader";
import React from "react";
export default function AuditForm({ onSuccess }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const report = await auditUrl(url);
            onSuccess(report);
        }
        catch (err) {
            setError(err?.response?.data?.error ??
                "Failed to audit the website. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }
    return (React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        React.createElement("input", { type: "url", placeholder: "https://example.com", value: url, onChange: (e) => setUrl(e.target.value), className: "w-full rounded-md border px-4 py-3" }),
        error && (React.createElement("div", { className: "rounded-md border border-red-300 bg-red-50 p-3 text-red-700" }, error)),
        loading ? (React.createElement(Loader, null)) : (React.createElement("button", { type: "submit", className: "w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 transition" }, "Audit Website"))));
}
