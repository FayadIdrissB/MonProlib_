import './header.css';

import logoP from '../../image/logoP.png'

function Header() {
    return (
        <div className="header">
            <div className="header_container">
                <div className='header_container_button-1'>
                    <img src={logoP} alt="" className='logo-p'/>  
                </div>
                <div className='header_container_button'>
                    <div className='header_container_button_paragraphe'>About Us</div>
                    <div className='header_container_button_paragraphe'>Log In</div>
                    <div className='header_container_button_started'>Get Started</div>
                </div>
            </div>
        </div>
    )
}

export default Header