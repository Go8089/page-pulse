import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { getRecentAudits, deleteAudit, clearHistory,} from "../lib/history";
import type { SavedAudit } from "../lib/history";
import { useNavigate } from "react-router-dom";
import HistoryStats from "../components/history/HistoryStats";
import HistoryDownloadMenu from "../components/history/HistoryDownloadMenu";
import WebsiteAvatar from "../components/history/WebsiteAvatar";
import { getGrade } from "../lib/grade";

export default function History() {
  const [history, setHistory] = useState<SavedAudit[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getRecentAudits());
  }, []);

  const filteredHistory = [...history]
  .filter((audit) =>
    audit.url.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

      case "highest":
        return b.score - a.score;

      case "lowest":
        return a.score - b.score;

      case "fastest":
        return (
          a.report.response_time_ms -
          b.report.response_time_ms
        );

      case "slowest":
        return (
          b.report.response_time_ms -
          a.report.response_time_ms
        );

      default:
        return 0;
    }
  });

  function remove(id: string) {
    deleteAudit(id);
    setHistory(getRecentAudits());
  }
function clearAll() {
  const confirmed = window.confirm(
    "Delete all saved audits?"
  );

  if (!confirmed) return;

  clearHistory();
  setHistory([]);
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
        <HistoryStats audits={history} />
      
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
  <input
    type="text"
    placeholder="Search by URL..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   className="
h-11
flex-1
rounded-xl
border border-white/10
bg-zinc-950/60
px-4
text-sm
outline-none
focus:border-sky-500
"
  />
  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="
    rounded-2xl
    border
    border-white/10
    bg-zinc-950/60
    px-5
   h-11
    outline-none
    focus:border-sky-500
  "
>
  <option value="newest">Newest</option>
  <option value="oldest">Oldest</option>
  <option value="highest">Highest Score</option>
  <option value="lowest">Lowest Score</option>
  <option value="fastest">Fastest</option>
  <option value="slowest">Slowest</option>
</select>
<button
  onClick={clearAll}
  className="
    rounded-xl
    border
    border-red-500/30
    px-5
   h-11
    text-sm-red-400
    transition
    hover:bg-red-500/10
  "
>
  Clear History
</button>
</div>
      
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

          {filteredHistory.map((audit) => {
            const grade = getGrade(audit.score);
            return (
            <div
                key={audit.id}
                className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 transition hover:border-sky-500/30">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

   <div className="flex-1">
   <div
  onClick={() =>
    setExpanded(
      expanded === audit.id ? null : audit.id
    )
  }
  className="cursor-pointer"
>
    <div className="flex items-center gap-4">

    <WebsiteAvatar
        url={audit.url}
    />

    <div>

        <h2 className="truncate text-lg font-semibold">
            {audit.url}
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
            {new Date(audit.createdAt).toLocaleString()}
        </p>

    </div>

</div>
<div className="text-right">

    <div
        className={`text-2xl font-bold ${grade.color}`}
    >
        {grade.grade}
    </div>

    <div className="text-sm text-zinc-500">
        {audit.score}/100
    </div>

</div>
     

    </div>

    <div className="mt-5 flex flex-wrap gap-3">

      <span className="rounded-full border border-white/10 px-3 py-1 text-sm">
        HTTP {audit.report.http_status}
      </span>

      <span className="rounded-full border border-white/10 px-3 py-1 text-sm">
        {audit.report.response_time_ms} ms
      </span>

      <span className="rounded-full border border-white/10 px-3 py-1 text-sm">
        {audit.report.word_count} words
      </span>

      <span className="rounded-full border border-white/10 px-3 py-1 text-sm">
        {audit.report.images_missing_alt} missing ALT
      </span>

    </div>

  </div>
 </div>
{expanded === audit.id && (
  <div className="mt-8 border-t border-white/10 pt-6">

    <div className="grid gap-6 md:grid-cols-2">

      <div>
        <p className="text-sm text-zinc-500">
          Page Title
        </p>

        <p className="mt-1">
          {audit.report.title || "Not Found"}
        </p>
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          Meta Description
        </p>

        <p className="mt-1">
          {audit.report.meta_description || "Missing"}
        </p>
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          H1 Count
        </p>

        <p className="mt-1">
          {audit.report.h1_count}
        </p>
      </div>

      <div>
        <p className="text-sm text-zinc-500">
          Images Missing ALT
        </p>

        <p className="mt-1">
          {audit.report.images_missing_alt}
        </p>
      </div>

    </div>

  </div>
)}
  <div className="flex flex-wrap gap-3">

    <button
      onClick={() =>
        navigate(`/report/${audit.id}`)
      }
      className="rounded-xl border border-white/10 px-4 py-2 transition hover:border-sky-500"
    >
      View Report
    </button>

    <button
      onClick={() =>
        navigate("/", {
          state: {
            rerunUrl: audit.url,
          },
        })
      }
      className="rounded-xl border border-sky-500/30 px-4 py-2 text-sky-400 transition hover:bg-sky-500/10"
    >
      Run Again
    </button>

    <HistoryDownloadMenu
  url={audit.url}
  score={audit.score}
  report={audit.report}
/>

    <button
      onClick={() => remove(audit.id)}
      className="rounded-xl border border-red-500/30 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
    >
      Delete
    </button>
  </div>
  

</div>

              

            
          );
      })}

        </div>

      </main>

      <Footer />
    </div>
  );
}