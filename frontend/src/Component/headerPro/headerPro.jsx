import './headerPro.css';


import { useNavigate } from 'react-router-dom';
import logoP from '../../image/logoP.png';

function HeaderPro() {

    const navigate = useNavigate();


  return (
    <div>
        <div className="header">
            <div className="header_container">
                <div className='header_container_pro'>
                    <img src={logoP} alt="" onClick={() => navigate('/')} className='logo-p'/>  
                    <div className='header_container_button_pro'>
                        Get Started
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HeaderPro;