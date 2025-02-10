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
}

const CandidatesList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');

    // ✅ Remove duplicates before setting state
    const uniqueCandidates = savedCandidates.filter((candidate: Candidate, index: number, self: Candidate[]) =>
      index === self.findIndex((c) => c.username === candidate.username)
    );

    setCandidates(uniqueCandidates);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center text-light">Candidates List</h2>
      <div className="row justify-content-center" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {candidates.length === 0 ? (
          <p className="text-center text-light">No saved candidates.</p>
        ) : (
          candidates.map((candidate, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card text-center shadow-lg mb-4">
                <img
                  src={candidate.avatarUrl ? candidate.avatarUrl : "https://via.placeholder.com/150"}
                  alt={`${candidate.candidateName}'s avatar`}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{candidate.candidateName}</h5>
                  <p className="card-text">
                    <strong>Username:</strong> {candidate.username} <br />
                    <strong>Location:</strong> {candidate.location || 'Unknown'} <br />
                    <strong>Company:</strong> {candidate.company || 'Unknown'}
                  </p>
                  <a href={candidate.htmlUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidatesList;