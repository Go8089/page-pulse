import { useParams } from "react-router-dom";
import { getRecentAudits } from "../lib/history";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Report from "../components/report/Report";

export default function SavedReport() {
  const { id } = useParams();

  const audit = getRecentAudits().find(
    (a) => a.id === id
  );

  if (!audit) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-5xl py-20 text-center">
          Report not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

  {/* Background Glow */}
  <div className="pointer-events-none absolute inset-0 -z-10">

    <div className="absolute left-1/2 top-[-150px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[180px]" />

    <div className="absolute right-[-150px] top-[350px] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[160px]" />

    <div className="absolute left-[-150px] bottom-[150px] h-[450px] w-[450px] rounded-full bg-sky-500/5 blur-[160px]" />

  </div>
      <Navbar />

      <Report
        report={audit.report}
        url={audit.url}
      />

      <Footer />
      </div>
    </>
  );
}