import './registerPro.css';

import Header from '../../../Component/header/header'
import FormRegister from '../../../Component/form_register/formRegister';


function RegisterPro() {
    return (
      <div className='resgister_page'>
        <Header />
        <FormRegister title="Inscription Pro" isPro={true}/>
      </div>
    );
  }
  
  export default RegisterPro;