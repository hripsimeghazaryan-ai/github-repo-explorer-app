import './App.css';
import { useState } from 'react';
import { useRepositoryData } from './hooks/useRepositoryData';
import RepositorySearch from './components/RepositorySearch/RepositorySearch';

function App() {
  const [repoPath1, setRepoPath1] = useState('');
  const [repoPath2, setRepoPath2] = useState('');
  const repositoryData1 = useRepositoryData(repoPath1);
  const repositoryData2 = useRepositoryData(repoPath2);

  const handleSearch = (path1, path2) => {
    setRepoPath1(path1);
    setRepoPath2(path2);
    repositoryData1.getData(path1);
    repositoryData2.getData(path2);
  };

  return (
    <div className="App">
      <RepositorySearch onSearch={handleSearch} />
    </div>
  );
}

export default App;
