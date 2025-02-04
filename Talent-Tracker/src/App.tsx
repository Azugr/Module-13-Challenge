import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateSearch from "./pages/CandidateSearch";
import SavedCandidates from "./pages/SavedCandidates";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Router>
      <NavBar /> {/* Add navigation bar */}
      <Routes>
        <Route path="/" element={<CandidateSearch />} /> {/* Default page */}
        <Route path="/saved" element={<SavedCandidates />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
