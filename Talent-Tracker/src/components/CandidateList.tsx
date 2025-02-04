import React from 'react';
import CandidateCard from './CandidateCard/CandidateCard';
import { Candidate } from '../interfaces/Candidate';

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  return (
    <div>
      {candidates.map(candidate => (
        <CandidateCard
          key={candidate.id}
          id={candidate.id}
          candidateName={candidate.candidateName || "N/A"}
          username={candidate.username}
          avatarUrl={candidate.avatarUrl}
          location={candidate.location || "N/A"}
          email={candidate.email || "N/A"}
          htmlUrl={candidate.htmlUrl}
          company={candidate.company || "N/A"}
        />
      ))}
    </div>
  );
};

export default CandidateList;