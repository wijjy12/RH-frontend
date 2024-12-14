import React from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import production from '../images/production.png';
import vente from '../images/vente.png';
import labo from '../images/labo.png';
import finance from '../images/finance.png';
import '../Style/services.scss';

const servicesData = [
  {
    image: production,
    title: 'Chef de Production',
    desc: `Prêt à optimiser les processus de production et à garantir la qualité ?`,
    link: '/production',
    btn: 'En savoir plus',
  },
  {
    image: vente,
    title: 'Directeur des Ventes',
    desc: `Êtes-vous prêt à booster les ventes et à atteindre des objectifs ambitieux ?`,
    link: '/vente',
    btn: 'En savoir plus',
  },
  {
    image: labo,
    title: 'Technicien de Laboratoire',
    desc: `Vous avez des compétences en laboratoire et cherchez un nouveau défi ?`,
    link: '/labo',
    btn: 'En savoir plus',
  },
  {
    image: finance,
    title: 'Directeur Financier',
    desc: `Passionné par la gestion financière et stratégique ? Découvrez nos postes en finance.`,
    link: '/finance',
    btn: 'En savoir plus',
  },
];

const Services = () => {
  return (
    <div className="services_cls section_padding">
      <h1 className="main-title heading">Offres d'emploi</h1>
      <div className="services-box">
        {servicesData.map((service, index) => (
          <div key={index} data-aos="zoom-in-right" data-aos-delay="0" className="card">
            <img src={service.image} alt={`${service.title} img`} />
            <div className="service-name">{service.title}</div>
            <div className="service-desc">{service.desc}</div>
            <Link to={service.link}>
              <button>{service.btn}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
