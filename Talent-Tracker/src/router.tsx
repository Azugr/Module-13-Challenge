import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import CandidatesList from './pages/CandidatesList';
import SavedCandidates from './pages/SavedCandidates';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateSearch />} />
        <Route path="/candidate-search" element={<CandidateSearch />} />
        <Route path="/candidates-list" element={<CandidatesList />} />
        <Route path="/saved-candidates" element={<SavedCandidates />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;