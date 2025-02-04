import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import { Candidate } from "../interfaces/Candidate";
import NoData from "../components/NoData";
import styles from "../styles/CandidateSearch.module.css";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Helper function to fetch data from the GitHub API and map the response correctly
const fetchGitHubUser = async (username: string): Promise<Candidate | null> => {
  if (!username) return null; // Prevent empty search

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Map GitHub API response to match the `Candidate` interface
    return {
      id: data.id,
      candidateName: data.name || "Not Available",
      username: data.login,
      avatarUrl: data.avatar_url,
      location: data.location || "Not Available",
      email: data.email || "Not Available",
      htmlUrl: data.html_url,
      company: data.company || "Not Available",
    };
  } catch (error) {
    console.error(`Error fetching data from GitHub API: ${error}`);
    return null;
  }
};

const CandidateSearch: React.FC = () => {
  const [username, setUsername] = useState<string>("octocat"); // Default username to load initially
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
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setError(null);
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    try {
      const result = await fetchGitHubUser(username);
      setCurrentCandidate(result);
    } catch (error) {
      setError("Candidate not found or API limit exceeded.");
      setCurrentCandidate(null);
    }
  };

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...potentialCandidates, currentCandidate];
      setPotentialCandidates(updatedCandidates);
      localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
      fetchCandidate(); // Fetch the next candidate
    }
  };

  const handleSkipCandidate = () => {
    fetchCandidate(); // Fetch the next candidate
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.searchInput}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search for candidates..."
      />
      <button className={styles.searchButton} onClick={fetchCandidate}>
        Search
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {currentCandidate ? (
        <div>
          <CandidateCard
            id={currentCandidate.id}
            candidateName={currentCandidate.candidateName || "Not Available"}
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

export default CandidateSearch;