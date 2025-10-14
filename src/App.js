import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // A URL completa da sua API backend
        const response = await fetch('http://localhost:3001/getUsers');
        if (!response.ok) {
          throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '40px', textAlign: 'center' }}>
      <h1>Lista de Usuários (com Drizzle ORM)</h1>
      <p>Dados buscados de um banco PostgreSQL no AWS RDS.</p>
      <div style={{ 
        display: 'inline-block', 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '20px', 
        marginTop: '20px' 
      }}>
        {loading && <p>Carregando usuários...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {users.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
            {users.map(user => (
              <li key={user.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                <strong>Nome:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email}
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;