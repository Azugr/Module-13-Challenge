import { fetchGitHubUser } from './API';
import { GitHubUser } from '../interfaces/GitHubUser';

export const getUserData = async (username: string): Promise<GitHubUser> => {
  try {
    const userData = await fetchGitHubUser(username);
    return {
      ...userData,
      candidateName: userData.candidateName || "N/A", 
    };
  } catch (error) {
    console.error(`Error getting user data for ${username}:`, error);
    throw error;
  }
};