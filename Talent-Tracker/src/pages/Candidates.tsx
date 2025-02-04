import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import { Candidate } from "../interfaces/Candidate";
import NoData from "../components/NoData";
import styles from "../styles/Candidates.module.css";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Helper function to fetch data from the GitHub API and map the response correctly
const fetchGitHubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const data = response.data;

    // Map GitHub API response to match the `Candidate` interface
    return {
      id: data.id,
      candidateName: data.name || "N/A",
      username: data.login,
      avatarUrl: data.avatar_url,
      location: data.location || "N/A",
      email: data.email || "N/A",
      htmlUrl: data.html_url,
      company: data.company || "N/A",
    };
  } catch (error) {
    console.error(`Error fetching data from GitHub API: ${error}`);
    return null;
  }
};

const Candidates: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load potential candidates from localStorage
    const savedCandidates = localStorage.getItem("potentialCandidates");
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }

    // Fetch the first candidate
    fetchNextCandidate();
  }, []);

  const fetchNextCandidate = async () => {
    setError(null);
    const result = await fetchGitHubUser("octocat"); // Replace with dynamic username fetching logic
    if (result) {
      setCurrentCandidate(result);
    } else {
      setError("No more candidates available.");
      setCurrentCandidate(null);
    }
  };

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...potentialCandidates, currentCandidate];
      setPotentialCandidates(updatedCandidates);
      localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
      fetchNextCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {currentCandidate ? (
        <div>
          <CandidateCard
            id={currentCandidate.id}
            candidateName={currentCandidate.candidateName}
            username={currentCandidate.username}
            avatarUrl={currentCandidate.avatarUrl}
            location={currentCandidate.location}
            email={currentCandidate.email}
            htmlUrl={currentCandidate.htmlUrl}
            company={currentCandidate.company}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.saveButton} onClick={handleSaveCandidate}>
              +
            </button>
            <button className={styles.skipButton} onClick={handleSkipCandidate}>
              -
            </button>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Candidates;