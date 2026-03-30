const VALID_SEGMENT = /^[a-zA-Z0-9._-]+$/;

export const fetchGitHubRepo = async (paths) => {
    const parts = (paths || '').split('/');
    if (parts.length !== 2) {
        throw new Error('Invalid format. Use "owner/repo".');
    }
    const [owner, repo] = parts;
    if (!VALID_SEGMENT.test(owner) || !VALID_SEGMENT.test(repo)) {
        throw new Error('Invalid characters in owner or repo name.');
    }
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