import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Candidate {
  id: string;
  avatarUrl: string;
  candidateName: string;
  username: string;
  location?: string;
  company?: string;
  htmlUrl: string;
  email?: string;
}

const CandidatesList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved candidates list
    const storedCandidates = JSON.parse(localStorage.getItem('candidatesList') || '[]');
    setCandidates(storedCandidates);
  }, []);

  // ✅ Function to Reject a Candidate
  const rejectCandidate = (candidateUsername: string) => {
    const updatedCandidates = candidates.filter((c) => c.username !== candidateUsername);

    // Update local storage
    localStorage.setItem('candidatesList', JSON.stringify(updatedCandidates));

    // Update state
    setCandidates(updatedCandidates);

    // ✅ Automatically update "savedCandidates" with the remaining candidates
    if (updatedCandidates.length === 0) {
      localStorage.removeItem('savedCandidates'); // 🔥 Clear storage if empty
    } else {
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-light">Candidates List</h2>

      {candidates.length === 0 ? (
        <p className="text-center text-light">No candidates left.</p>
      ) : (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject</th>
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
                <td>
                  <button className="btn btn-danger" onClick={() => rejectCandidate(candidate.username)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidatesList;
