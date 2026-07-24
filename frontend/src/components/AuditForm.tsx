import { useState } from "react";
import { auditUrl } from "../api/audit";
import type { AuditReport } from "../types/audit";
import Loader from "./Loader";
import React from "react";

type Props = {
  onSuccess: (report: AuditReport) => void;
};

export default function AuditForm({ onSuccess }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
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
    } catch (err: any) {
      setError(
        err?.response?.data?.error ??
          "Failed to audit the website. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-md border px-4 py-3"
      />

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
  <Loader />
) : (
  <button
    type="submit"
    className="w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 transition"
  >
    Audit Website
  </button>
)}
    </form>
  );
}