import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const username = 'tiagoramossilva'; 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Erro ao buscar o perfil', error);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profile) return <div>Carregando perfil...</div>;

  return (
    <div className="profile">
      <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} className="profile-image" />
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
      <p>Seguidores: {profile.followers}</p>
      <p>Seguindo: {profile.following}</p>
      <p>Repositórios Públicos: {profile.public_repos}</p>
    </div>
  );
};

export default Profile;
