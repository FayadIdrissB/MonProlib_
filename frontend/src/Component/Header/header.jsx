import './header.css';



function Header() {
    return (
        <div className="header">
            <div className="header_container">
                <div className='header_container_button'>
                    <div className='header_container_button_paragraphe'>Home</div>
                    <div className='header_container_button_paragraphe'>About Us</div>
                    <div className='header_container_button_paragraphe'>Portfolio</div>
                </div>
                <div className='header_container_button'>
                    <div className='header_container_button_title'>EcoNest</div>
                </div>
                <div className='header_container_button'>
                    <div className='header_container_button_paragraphe'>Log In</div>
                    <div className='header_container_button_started'>Get Started</div>
                </div>
            </div>
        </div>
    )
}

export default Header