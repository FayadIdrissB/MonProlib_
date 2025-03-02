import './home.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; 


import Header from '../../Component/header/header';
import Footer from '../../Component/footer/footer';
import Logo from '../../Image/logoP.png'


// Importation des images locales
import image1 from "../../Image/mecanicien.jpeg";
import image2 from "../../Image/artisan.jpg";
import image3 from "../../Image/laveur_auto.jpg";

const images = [image1, image2, image3];


function Home() {

    // Utilisation de la navigation.
    const navigate = useNavigate();

    // direction vers la page HomePlus 
    // eslint-disable-next-line no-unused-vars
    const handleNavigate = () => {
    navigate('/');}


    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

  return (
    <div>
        <Header />
        <div className='body_'>
            <div className='body_container'>
                <div className='body_container_text'>
                    <h2 className='body_container_text_title'>Tips For An Eco-Friendly
                    < br />
                    <img src={Logo} alt="" className='body_logo'/>  Lifestyle</h2>
                    <p className='body_container_text_paragraphe'>We believe that small changes to adopt sustainable practices can make a big impact.</p>
                    {/*
                    <div className='body_container_text_search'>
                        <p className='body_container_text_search_paragraphe'>
                            Search here...
                        </p> 
                        <div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'white' }}  className="text-icone" />
                        </div>
                    </div>
                    */}
                </div>
            </div>
            <div className='body_container_image'>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Slide ${index + 1}`}
                    className="carousel_img"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Home;