// Base URLs
export const API_BASE_URL = 'https://api.example.com';
export const GITHUB_API_URL = 'https://api.github.com';

// GitHub API endpoints
export const GITHUB_USER_ENDPOINT = (username: string): string => `${GITHUB_API_URL}/users/${username}`;
export const GITHUB_REPO_ENDPOINT = (owner: string, repo: string): string => `${GITHUB_API_URL}/repos/${owner}/${repo}`;
export const GITHUB_USER_REPOS_ENDPOINT = (username: string): string => `${GITHUB_API_URL}/users/${username}/repos`;
export const GITHUB_USER_FOLLOWERS_ENDPOINT = (username: string): string => `${GITHUB_API_URL}/users/${username}/followers`;
export const GITHUB_SEARCH_USERS_ENDPOINT = (query: string): string => `${GITHUB_API_URL}/search/users?q=${query}`;

// Other constants
export const DEFAULT_AVATAR_URL = '/src/assets/images/avatar.png';
export const ITEMS_PER_PAGE = 30;

