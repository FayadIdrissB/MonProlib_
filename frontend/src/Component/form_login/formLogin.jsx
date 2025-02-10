import './formLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function FormLogin({ onClickPath, titleConnexion }) {

  const navigate = useNavigate();

  const [ msg, setMsg ] = useState('')
  const handleClick = async () => 
  {
    const data = await window.fetch('/api/youtube')
    const json = await data.json()
    console.log(json)
  }


  return (
    <div className='login'>
      <h2 className='container_login_title' onClick={() => navigate(onClickPath)}>{titleConnexion}</h2>
      <div className='container_login'>
          <div className='container_login_form'>
              <input className='container_login_form_input' title="Cliquez ici pour vous inscrire" placeholder='Email' /> 
              <input className='container_login_form_input' title="Cliquez ici pour vous inscrire" placeholder='Mot de passe' /> 
              <input className='container_form_send' title="Cliquez ici pour vous inscrire" type="submit" onClick={handleClick} /> 
              <p>{msg}</p>
          </div>
      </div>
    </div>
    );
  }
  
  export default FormLogin;