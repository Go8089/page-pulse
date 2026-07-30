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
      <Navbar />

      <Report
        report={audit.report}
        url={audit.url}
      />

      <Footer />
    </>
  );
}