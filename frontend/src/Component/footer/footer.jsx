import './footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";


function Footer() {
    return (
       <div className='footer'>
            <div className='footer_container'>
                <div className='footer_container_list'>
                    <div className='footer_container_list_block'>
                        <p className='footer_container_list_title'>Notre entreprise</p>
                        <p className='list'> À propos de nous </p>
                        <p className='list'> Carrières </p>
                        <p className='list'> Besoin d'aide ? </p>
                    </div>
                    <div className='footer_container_list_block'>
                        <p className='footer_container_list_title'>Trouvez votre spécialiste</p>
                        <p className='list'> À propos de nous </p>
                        <p className='list'> Carrières </p>
                        <p className='list'> Besoin d'aide ? </p>
                    </div>
                    <div className='footer_container_list_block'>
                        <p className='footer_container_list_title'>Recherches fréquentes</p>
                        <p className='list'> À propos de nous </p>
                        <p className='list'> Carrières </p>
                        <p className='list'> Besoin d'aide ? </p>
                    </div>
                    <div className='footer_container_list_block'>
                        <p className='footer_container_list_title'>Nos réseaux sociaux</p>
                        <div className='list_icon' style={{ display: "flex", gap: "10px", fontSize: "24px" }}>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: "#1877F2" }} />
                            <FontAwesomeIcon icon={faInstagram} style={{ color: "#E4405F" }} />
                            <FontAwesomeIcon icon={faXTwitter} style={{ color: "#000" }} />
                            <FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000" }} />
                         </div>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Footer