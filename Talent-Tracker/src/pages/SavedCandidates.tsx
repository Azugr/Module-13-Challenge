import React, { useEffect, useState } from 'react';
import CandidateList from './CandidateList';
import { Candidate } from '../interfaces/Candidate';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch saved candidates from local storage or an API
    const fetchSavedCandidates = async () => {
      // Example: Fetching from local storage
      const saved = localStorage.getItem('savedCandidates');
      if (saved) {
        setSavedCandidates(JSON.parse(saved));
      }
    };

    fetchSavedCandidates();
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <CandidateList candidates={savedCandidates} />
      ) : (
        <p>No saved candidates found.</p>
      )}
    </div>
  );
};

export default SavedCandidates;