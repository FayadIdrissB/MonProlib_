import './loginUser.css';


import Header from '../../../Component/header/header';
import FormLogin from '../../../Component/form_login/formLogin';


function LoginUser() {
  return (
    <div>
      <Header />
      <FormLogin 
        onClickPath="/login_pro" 
        titleConnexion="Utilisateur"
      />
    </div>
  );
}

export default LoginUser;