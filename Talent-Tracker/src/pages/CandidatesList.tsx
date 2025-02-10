import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Candidate {
    avatar_url: string;
    name: string;
    login: string;
    location?: string;
    company?: string;
    html_url: string;
}

const CandidatesList = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const savedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
        setCandidates(savedCandidates);
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-center text-light">Candidates List</h2>
            <div className="row justify-content-center">
                {candidates.length === 0 ? (
                    <p className="text-center text-light">No saved candidates.</p>
                ) : (
                    candidates.map((candidate, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <div className="card text-center shadow-lg mb-4">
                                <img 
                                    src={candidate.avatar_url} 
                                    alt={candidate.name} 
                                    className="card-img-top rounded-circle mx-auto mt-3"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{candidate.name}</h5>
                                    <p className="card-text">
                                        <strong>Username:</strong> {candidate.login} <br />
                                        <strong>Location:</strong> {candidate.location || "Unknown"} <br />
                                        <strong>Company:</strong> {candidate.company || "Unknown"}
                                    </p>
                                    <a href={candidate.html_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
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