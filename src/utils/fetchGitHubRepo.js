export const fetchGitHubRepo = async (paths) => {
    const [owner, repo] = paths.split('/');
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            throw new Error(`Repository "${owner}/${repo}" not found. Check that the owner and repository name are correct.`);
        }

        if (response.status === 403) {
            throw new Error(`GitHub API rate limit exceeded. Please wait a few minutes before trying again.`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
};