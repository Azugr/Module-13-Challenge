import React, { useState, useEffect } from "react";
import axios from "axios";
import CandidateCard from "../components/CandidateCard/CandidateCard";
import Button from "../components/Button/Button";
import { Candidate } from "../interfaces/Candidate";
import NoData from "../components/NoData";
import styles from "../styles/CandidateSearch.module.css";
import buttonStyles from '../components/Button/Button.module.css';
import { useNavigate } from 'react-router-dom';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const fetchGitHubUser = async (username: string): Promise<Candidate | null> => {
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

    return {
      id: data.id,
      candidateName: data.name || 'Not Available',
      username: data.login,
      avatarUrl: data.avatar_url,
      location: data.location || 'Not Available',
      email: data.email || 'Not Available',
      htmlUrl: data.html_url,
      company: data.company || 'Not Available',
    };
  } catch (error) {
    console.error(`Error fetching data from GitHub API: ${error}`);
    return null;
  }
};

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCandidates = localStorage.getItem('candidates');
    if (savedCandidates) {
      setPotentialCandidates(JSON.parse(savedCandidates));
    }

    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setError(null);
    const username = await generateRandomUsername();
  
    if (!username) {
      setError('Failed to generate a random username.');
      return;
    }
  
    try {
      const result = await fetchGitHubUser(username);
      if (result) {
        setCurrentCandidate(result);
      } else {
        setError('Candidate not found or API limit exceeded.');
        setCurrentCandidate(null);
      }
    } catch (error) {
      setError('Candidate not found or API limit exceeded.');
      setCurrentCandidate(null);
    }
  };


  const saveCandidate = (candidate: Candidate) => {
    const storedCandidates = JSON.parse(localStorage.getItem("candidatesList") || "[]");

    // ✅ Check if candidate is already in the list
    const isDuplicate = storedCandidates.some((c: Candidate) => c.username === candidate.username);

    if (!isDuplicate) {
      const updatedCandidates = [...storedCandidates, candidate];

      // ✅ Save updated list to local storage
      localStorage.setItem("candidatesList", JSON.stringify(updatedCandidates));
      setPotentialCandidates(updatedCandidates);
    } else {
      console.log("Candidate already exists in the list!");
    }
  };

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      saveCandidate(currentCandidate);
      fetchCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchCandidate();
  };

  const handleViewCandidatesList = () => {
    navigate('/candidates-list');
  };

  const generateRandomUsername = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://api.github.com/users?since=' + Math.floor(Math.random() * 1000000), {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.length > 0) {
        return data[0].login;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error fetching random GitHub user: ${error}`);
      return null;
    }
  };

  return (
    <div className="container text-center">
      {error && <p className="text-danger">{error}</p>}
      {currentCandidate ? (
        <div>
          <CandidateCard
            id={currentCandidate.id}
            candidateName={currentCandidate.candidateName || 'Not Available'}
            username={currentCandidate.username}
            avatarUrl={currentCandidate.avatarUrl}
            location={currentCandidate.location}
            email={currentCandidate.email}
            htmlUrl={currentCandidate.htmlUrl}
            company={currentCandidate.company}
          />
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button onClick={handleSaveCandidate} className="btn btn-success">
              +
            </button>
            <button onClick={handleSkipCandidate} className="btn btn-danger">
              -
            </button>
            <button onClick={handleViewCandidatesList} className="btn btn-primary">
              View Candidates List
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