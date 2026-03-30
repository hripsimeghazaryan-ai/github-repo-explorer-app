import Inputs from "../Inputs/Inputs";
import { useState } from "react";
import './RepositorySearch.css';

const RepositorySearch = ({ onSearch }) => {
    const [repo1, setRepo1] = useState(() => localStorage.getItem('repo1') || '');
    const [repo2, setRepo2] = useState(() => localStorage.getItem('repo2') || '');

    const handleSubmit = () => {
        if (repo1 && repo2) {
            localStorage.setItem('repo1', repo1);
            localStorage.setItem('repo2', repo2);
            onSearch(repo1, repo2);
        }
    };

    return (
        <div className="repository-search-container">
            <Inputs title="Repo 1" placeholder="owner/repo" value={repo1} onChange={(e) => setRepo1(e.target.value)} />
            <Inputs title="Repo 2" placeholder="owner/repo" value={repo2} onChange={(e) => setRepo2(e.target.value)} />
            <button className="search-btn" onClick={handleSubmit}>Compare</button>
        </div>
    )
}

export default RepositorySearch;