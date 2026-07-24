import { useState } from "react";
import AuditForm from "./components/AuditForm";
import AuditReport from "./components/AuditReport";
import type { AuditReport as Report } from "./types/audit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [report, setReport] = useState<Report | null>(null);

  return (
  <main className="min-h-screen bg-slate-100">
    <div className="mx-auto max-w-6xl px-6 py-12">

      <Navbar />

      <div className="rounded-xl bg-white p-8 shadow-lg">
        <AuditForm onSuccess={setReport} />
      </div>

     {report ? (
  <AuditReport report={report} />
) : (
  <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
    Enter a website URL above and click <strong>Audit Website</strong> to view the analysis.
  </div>
)}

      <Footer />

    </div>
  </main>
);
}

export default App;