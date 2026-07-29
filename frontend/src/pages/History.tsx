import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getRecentAudits, deleteAudit } from "../lib/history";
import type { SavedAudit } from "../lib/history";

export default function History() {
  const [history, setHistory] = useState<SavedAudit[]>([]);

  useEffect(() => {
    setHistory(getRecentAudits());
  }, []);

  function remove(id: string) {
    deleteAudit(id);
    setHistory(getRecentAudits());
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">

        <h1 className="text-4xl font-bold">
          Audit History
        </h1>

        <p className="mt-2 text-zinc-500">
          Previously saved website audits.
        </p>

        {history.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 text-center">
            <h2 className="text-xl font-semibold">
              No audits yet
            </h2>

            <p className="mt-2 text-zinc-500">
              Run your first website audit to see it here.
            </p>
          </div>
        )}

        <div className="mt-10 space-y-6">

          {history.map((audit) => (
            <div
              key={audit.id}
              className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    {audit.url}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    {new Date(audit.createdAt).toLocaleString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-bold text-sky-400">
                    {audit.score}
                  </p>

                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Score
                  </p>

                </div>

              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-5">

                <div>
                  <p className="text-xs text-zinc-500">
                    Status
                  </p>

                  <p>{audit.report.http_status}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Response
                  </p>

                  <p>{audit.report.response_time_ms} ms</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Words
                  </p>

                  <p>{audit.report.word_count}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Missing ALT
                  </p>

                  <p>{audit.report.images_missing_alt}</p>
                </div>

                <div>
                  <button
                    onClick={() => remove(audit.id)}
                    className="rounded-xl border border-red-500/30 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>

      </main>

      <Footer />
    </div>
  );
}