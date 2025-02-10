import React from 'react';
import styles from './CandidateCard.module.css';

interface CandidateProps {
  id: string;
  candidateName: string;
  username: string;
  avatarUrl: string;
  location?: string;
  email?: string;
  htmlUrl: string;
  company?: string;
}

const CandidateCard: React.FC<CandidateProps> = ({
  candidateName,
  username,
  avatarUrl,
  location = 'Not available',
  email = 'Not available',
  htmlUrl,
  company = 'Not available',
}) => {
  return (
    <div className={styles.card}>
      <img src={avatarUrl} alt={`${candidateName}'s avatar`} className={styles.cardImg} />
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{candidateName}</h2>
        <p className={styles.cardText}>Username: {username}</p>
        <p className={styles.cardText}>Location: {location}</p>
        <p className={styles.cardText}>Email: {email}</p>
        <p className={styles.cardText}>Company: {company}</p>
        <a href={htmlUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          View Profile
        </a>
      </div>
    </div>
  );
};

export default CandidateCard;