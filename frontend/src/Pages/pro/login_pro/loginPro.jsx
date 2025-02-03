import './loginPro.css';
import Header from '../../../Component/Header/header';


import { useNavigate } from 'react-router-dom';



function LoginPro() {

  const navigate = useNavigate();

  return (
    <div className='login'>
      <Header />
      <div className='container_login'>
        <div className='container_login_div'>
          <div className='container_login_fiche' onClick={() => navigate('/Login_utilisateur')}>  <p className='container_login_fiche_text'> Utilisateur </p>   </div>
          <input className='container_login_input' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
          <input className='container_login_input' title="Cliquez ici pour vous inscrire" placeholder='Mot de passe' /> 
        </div>
      </div>
    </div>
  );
}

export default LoginPro;