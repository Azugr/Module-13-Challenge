import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import CandidateSearch from './pages/CandidateSearch';
import CandidatesList from './pages/CandidatesList';
import SavedCandidates from './pages/SavedCandidates';
import { CandidateProvider } from './context/CandidateContext';

const App: React.FC = () => {
  return (
    <CandidateProvider>
      <Router>
        <div className="App">
          <NavBar />
          <main className="container">
            <Routes>
              <Route path="/" element={<CandidateSearch />} />
              <Route path="/CandidatesList" element={<CandidatesList />} />
              <Route path="/SavedCandidates" element={<SavedCandidates />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CandidateProvider>
  );
};

export default App;
