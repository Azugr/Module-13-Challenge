export interface GitHubUser {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;

  // Optional fields you might use:
  candidateName?: string;
  company?: string;
  location?: string;
  bio?: string;
}

export interface GitHubFollower {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
}

export interface GitHubRepo {
  id: number;
  candidateName: string;
  htmlUrl: string;
  description?: string;
  language?: string;

  stargazers_count?: number;
  forks_count?: number;
  watchers_count?: number;


  owner?: GitHubUser;
}

export interface SearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}
