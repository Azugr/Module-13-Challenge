import React, { useState } from "react";
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
      candidateName: data.candidateName || "Not Available",
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
  const [username, setUsername] = useState<string>("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    const result = await fetchGitHubUser(username);
    if (result) {
      setCandidate(result);
    } else {
      setError("Candidate not found or API limit exceeded.");
      setCandidate(null);
    }
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
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {candidate ? (
        <CandidateCard
          id={candidate.id}
          candidateName={candidate.candidateName || "N/A"}
          username={candidate.username}
          avatarUrl={candidate.avatarUrl} 
          location={candidate.location}
          email={candidate.email}
          htmlUrl={candidate.htmlUrl} 
          company={candidate.company}
        />
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default CandidateSearch;
