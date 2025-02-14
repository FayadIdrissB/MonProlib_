import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './welcomeUser.css';
import HeaderPro from '../../../Component/header_connexion/headerConnexion';

function WelcomeUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.error('Erreur:', error));
  }, [userId]);

  return (
    <div>
        <HeaderPro />
        <div className='container_user'>
          <h1>Bienvenue sur votre espace utilisateur, {user?.email}</h1>
        </div>
    </div>
  );
}

export default WelcomeUser;