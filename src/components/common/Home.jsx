import React, { useEffect } from 'react';
import Service from "./Service";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Style/home.scss';
import banklogo from '../images/wiwiwi.png';
import react from '../images/react.png';


const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the animation duration to 1200ms (1.2 seconds)
        });
    }, []);

    return (
        <section className="home_cls">
            <div className="home-cntr">
                <div className="home_txt">
                    <p className="greetings">Bienvenue à</p>
                    <div data-aos="fade-right" data-aos-delay="0" className="name_logo_bx">
                        <img src={banklogo} alt="" />
                    </div>
                    <p>
                        "Le cœur de notre entreprise : l'excellence !"
                    </p>
                    <h3>Ceci est un site web pour les employés et les candidats aussi </h3>
                    
                </div>
                <div className="home_img">
                    <img src={react} alt="home-img" />
                </div>
            </div>
            <Service />
        </section>
    );
};

export default Home;
