import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './IssuePage.css'; 

const IssuePage = () => {
  const [issue, setIssue] = useState(null);
  const { number } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/tiagoramossilva/MyFinance/issues/${number}`);
        setIssue(response.data);
      } catch (error) {
        console.error('Erro ao buscar a issue', error);
      }
    };

    fetchIssue();
  }, [number]);

  if (!issue) return <div>Carregando a issue...</div>;

  const createdAt = new Date(issue.created_at);
  const today = new Date();
  const diffTime = Math.abs(today - createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="issue-page">
      <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
      <h1>{issue.title}</h1>
      <div className="issue-info">
        <p>Autor: {issue.user.login}</p>
        <p>Criada há {diffDays} dias</p>
        <p>Comentários: {issue.comments}</p>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
          Ver no GitHub
        </a>
      </div>
      <div className="issue-summary">
        <h2>Resumo:</h2>
        <p>{issue.body || 'Sem resumo disponível'}</p>
      </div>
      <div className="issue-body" dangerouslySetInnerHTML={{ __html: issue.body_html }} />
    </div>
  );
};

export default IssuePage;
