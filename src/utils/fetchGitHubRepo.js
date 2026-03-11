export const fetchGitHubRepo = async (paths) => {
    const [owner, repo] = paths.split('/');
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            throw new Error(`Repository not found: ${response.status}`);
        }

        if (response.status === 403) {
            throw new Error(`API rate limit exceeded: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error(`Error fetching GitHub repo: ${error.message}`);
    }
};