import React, { useState, useEffect } from 'react';
import CandidateCard from '../components/CandidateCard/CandidateCard';
import { Candidate } from '../interfaces/Candidate';
import styles from '../styles/SavedCandidates.module.css';

const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');

    if (savedCandidates.length === 0) {
      localStorage.removeItem('savedCandidates'); // Clear storage if empty
    }

    setCandidates(savedCandidates);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Saved Candidates</h2>
      {candidates.length > 0 ? (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.candidateName}
                    className="rounded-circle"
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td><strong>{candidate.candidateName}</strong></td>
                <td>{candidate.location || 'Unknown'}</td>
                <td>{candidate.email || 'Not provided'}</td>
                <td>{candidate.company || 'Not provided'}</td>
                <td>
                  <a href={candidate.htmlUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default SavedCandidates;