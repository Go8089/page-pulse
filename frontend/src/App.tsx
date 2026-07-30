import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import SavedReport from "./pages/SavedReport";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/report/:id" element={<SavedReport />} />
      </Routes>
    </BrowserRouter>
  );
}