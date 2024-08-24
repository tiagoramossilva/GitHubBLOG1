import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile'; 
import './HomePage.css'; 

const HomePage = () => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`https://api.github.com/search/issues?q=${search}+repo:tiagoramossilva/MyFinance`);
        setIssues(response.data.items);
      } catch (error) {
        console.error('Erro ao buscar as issues', error);
      }
    };

    fetchIssues();
  }, [search]);

  return (
    <div className="home-page">
      <Profile /> 
      <h1>GitHub Blog</h1>
      <input
        type="text"
        placeholder="Buscar issues"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="issue-list">
        {issues.map((issue) => (
          <li key={issue.id} className="issue-item">
            <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
            <p>{issue.body.length > 100 ? `${issue.body.substring(0, 150)}...` : issue.body}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
