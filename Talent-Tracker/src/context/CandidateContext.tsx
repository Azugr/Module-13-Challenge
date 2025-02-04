import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Candidate {
  id: string;
  candidateName: string;
  username: string;
  avatarUrl: string;
  location?: string;
  email?: string;
  htmlUrl: string;
  company?: string;
}

interface CandidateContextType {
  candidates: Candidate[]; // List of all candidates to review
  savedCandidates: Candidate[]; // List of saved candidates
  currentCandidate: Candidate | null; // Current candidate being displayed
  saveCandidate: (candidate: Candidate) => void; // Save a candidate to the saved list
  rejectCandidate: () => void; // Skip the current candidate
  setCandidates: (candidates: Candidate[]) => void; // Set the list of candidates
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

// Provider component to wrap the app
export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  const saveCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) => [...prev, candidate]);
    rejectCandidate(); // Automatically skip to the next candidate
  };

  const rejectCandidate = () => {
    setCandidates((prev) => prev.slice(1)); // Remove the current candidate from the list
    setCurrentCandidate(candidates[1] || null); // Set the next candidate or null if no more candidates
  };

  const updateCandidates = (candidateList: Candidate[]) => {
    setCandidates(candidateList);
    setCurrentCandidate(candidateList.length > 0 ? candidateList[0] : null); // Set the first candidate
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        savedCandidates,
        currentCandidate,
        saveCandidate,
        rejectCandidate,
        setCandidates: updateCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

// Custom hook to use the CandidateContext
export const useCandidateContext = (): CandidateContextType => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};
