import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import IssueList from '../components/IssueList'; 
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
      <IssueList issues={issues} /> 
    </div>
  );
};

export default HomePage;
