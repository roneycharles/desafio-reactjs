import React, { useState, useEffect } from 'react';
import api from './services/api'
import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: "http://newurl.com",
      techs: ["tech1"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(repository => id!==repository.id);

    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <div>
              <ul>
                <li>{repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                </li>
                <li>{repository.url}</li>
                <li>{repository.techs}</li>
              </ul>
            </div>
        </li>
        ))}
        
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
