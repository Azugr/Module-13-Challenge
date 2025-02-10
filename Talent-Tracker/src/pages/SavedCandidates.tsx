import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/CandidateCard/CandidateCard';
import { Candidate } from '../interfaces/Candidate';
import styles from '../styles/SavedCandidates.module.css';


const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2>Saved Candidates</h2>
      {candidates.length > 0 ? (
        candidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            id={candidate.id}
            candidateName={candidate.candidateName || 'N/A'}
            username={candidate.username}
            avatarUrl={candidate.avatarUrl}
            location={candidate.location || 'N/A'}
            email={candidate.email || 'N/A'}
            htmlUrl={candidate.htmlUrl}
            company={candidate.company || 'N/A'}
          />
        ))
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default SavedCandidates;