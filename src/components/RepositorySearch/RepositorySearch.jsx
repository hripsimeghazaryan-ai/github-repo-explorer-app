import Inputs from "../Inputs/Inputs";
import { useState } from "react";
import './RepositorySearch.css';

const RepositorySearch = ({ onSearch }) => {
    const [repo1, setRepo1] = useState(() => localStorage.getItem('repo1') || '');
    const [repo2, setRepo2] = useState(() => localStorage.getItem('repo2') || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (repo1 && repo2) {
            localStorage.setItem('repo1', repo1);
            localStorage.setItem('repo2', repo2);
            onSearch(repo1, repo2);
        }
    };

    return (
        <form
            className="repository-search-container"
            onSubmit={handleSubmit}
            aria-label="Compare two GitHub repositories"
        >
            <Inputs id="repo-input-1" title="Repo 1" placeholder="owner/repo" value={repo1} onChange={(e) => setRepo1(e.target.value)} />
            <Inputs id="repo-input-2" title="Repo 2" placeholder="owner/repo" value={repo2} onChange={(e) => setRepo2(e.target.value)} />
            <button className="search-btn" type="submit" disabled={!repo1 || !repo2} aria-disabled={!repo1 || !repo2}>
                Compare
            </button>
        </form>
    )
}

export default RepositorySearch;