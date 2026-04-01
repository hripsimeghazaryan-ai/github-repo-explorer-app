import './ComparisonDisplay.css';

const STATS = [
  { key: 'stargazers_count', label: 'Stars' },
  { key: 'forks_count', label: 'Forks' },
  { key: 'open_issues_count', label: 'Open Issues' },
];

function getWinners(data1, data2) {
  if (!data1 || !data2) return {};
  return Object.fromEntries(
    STATS
      .filter(({ key }) => data1[key] !== data2[key])
      .map(({ key }) => [key, data1[key] > data2[key] ? 1 : 2])
  );
}

function RepositoryCard({ data, loading, error, repoNum, winners }) {
  if (loading) {
    return (
      <div className="repo-card repo-card--loading" role="status" aria-live="polite" aria-label="Loading repository data">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repo-card repo-card--error" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <article className="repo-card" aria-label={`Repository ${data.full_name}`}>
      <div className="repo-card__header">
        <div className="repo-card__identity">
          <img
            className="repo-card__avatar"
            src={data.owner?.avatar_url}
            alt={`${data.owner?.login}'s avatar`}
          />
          <h2 className="repo-card__name">{data.full_name}</h2>
        </div>
        {data.language && (
          <span className="repo-card__language" aria-label={`Primary language: ${data.language}`}>{data.language}</span>
        )}
      </div>
      {data.description && (
        <p className="repo-card__description">{data.description}</p>
      )}
      <ul className="repo-card__stats" aria-label="Repository statistics">
        {STATS.map(({ key, label }) => {
          const isWinner = winners[key] === repoNum;
          return (
            <li
              key={key}
              className={`stat ${isWinner ? 'stat--winner' : ''}`}
              aria-label={`${label}: ${(data[key] ?? 0).toLocaleString()}${isWinner ? ' (higher)' : ''}`}
            >
              <span className="stat__label">{label}</span>
              <span className="stat__value">{(data[key] ?? 0).toLocaleString()}</span>
            </li>
          );
        })}
      </ul>
      <div className="repo-card__footer">
        <span>Last updated: <time dateTime={data.updated_at}>{new Date(data.updated_at).toLocaleDateString()}</time></span>
        <a
          className="repo-card__github-link"
          href={data.html_url?.startsWith('https://') ? data.html_url : '#'}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${data.full_name} on GitHub (opens in new tab)`}
        >
          View on GitHub
        </a>
      </div>
    </article>
  );
}

function ComparisonDisplay({ repo1, repo2 }) {
  const hasContent =
    repo1.loading || repo2.loading ||
    repo1.data || repo2.data ||
    repo1.error || repo2.error;

  if (!hasContent) return null;

  const winners = getWinners(repo1.data, repo2.data);

  return (
    <section className="comparison-display" aria-label="Comparison results">
      <RepositoryCard {...repo1} repoNum={1} winners={winners} />
      <RepositoryCard {...repo2} repoNum={2} winners={winners} />
    </section>
  );
}

export default ComparisonDisplay;
