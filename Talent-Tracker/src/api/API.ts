const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchGitHubData = async (endpoint: string) => {
  try {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching data from GitHub API: ${error}`);
    throw error;
  }
};

export const fetchGitHubUser = async (username: string) => {
  return fetchGitHubData(`/users/${username}`);
};