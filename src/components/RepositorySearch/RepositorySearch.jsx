import Inputs from "../Inputs/Inputs";
import { useState } from "react";

const RepositorySearch = ({ onSearch }) => {
    const [repo1, setRepo1] = useState('');
    const [repo2, setRepo2] = useState('');
    // const [error, setError] = useState('');

    const handleSubmit = () => {
        if (repo1 && repo2) {
            onSearch(repo1, repo2);
        }
    };

    return (
        <div className="repository-search-container">
            <Inputs title="Repository 1" placeholder="Enter repository name" value={repo1} onChange={(e) => setRepo1(e.target.value)} />
            <Inputs title="Repository 2" placeholder="Enter repository name" value={repo2} onChange={(e) => setRepo2(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default RepositorySearch;