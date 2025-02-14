import './registerUser.css';

import Header from '../../../Component/header/header'
import FormRegister from '../../../Component/form_register/formRegister'


function RegisterUser() {
    return (
      <div>
        <Header />
        <FormRegister title="Inscription Utilisateur" isPro={false}/>
      </div>
    );
  }
  
  export default RegisterUser;