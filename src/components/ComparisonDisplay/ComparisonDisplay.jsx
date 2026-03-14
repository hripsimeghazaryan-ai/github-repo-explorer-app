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

function RepoCard({ data, loading, error, repoNum, winners }) {
  if (loading) {
    return (
      <div className="repo-card repo-card--loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repo-card repo-card--error">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="repo-card">
      <div className="repo-card__header">
        <div className="repo-card__identity">
          <img
            className="repo-card__avatar"
            src={data.owner.avatar_url}
            alt={data.owner.login}
          />
          <h2 className="repo-card__name">
            <a href={data.html_url} target="_blank" rel="noreferrer">
              {data.full_name}
            </a>
          </h2>
        </div>
        {data.language && (
          <span className="repo-card__language">{data.language}</span>
        )}
      </div>
      {data.description && (
        <p className="repo-card__description">{data.description}</p>
      )}
      <ul className="repo-card__stats">
        {STATS.map(({ key, label }) => (
          <li
            key={key}
            className={`stat ${winners[key] === repoNum ? 'stat--winner' : ''}`}
          >
            <span className="stat__label">{label}</span>
            <span className="stat__value">{data[key].toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
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
    <div className="comparison-display">
      <RepoCard {...repo1} repoNum={1} winners={winners} />
      <RepoCard {...repo2} repoNum={2} winners={winners} />
    </div>
  );
}

export default ComparisonDisplay;
