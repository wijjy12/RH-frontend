import React from 'react';
import '../Style/finance.scss';
import { useNavigate } from 'react-router-dom';


const Finance = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/register');
  };
  return (
    <div className="job-offer">
      <h1>Directeur Financier</h1>
      
      <section className="company-info">
        <h2>Nom de l’entreprise</h2>
        <p>L’entreprise Wijdane Companyest à la recherche d’un/e Directeur Financier pour le 01/09/2024</p>
      </section>
      
      <section className="job-title">
        <h2>Titre du poste</h2>
        <p>Directeur Financier à 80-100%</p>
      </section>
      
      <section className="work-location">
        <h2>Lieu de travail</h2>
        <p>Genève et Lausanne, possibilité de Home Office</p>
      </section>
      
      <section className="company-about">
        <h2>A propos de l’entreprise</h2>
        <p>Fondée en 1986 à Lausanne, l’entreprise Wijdane Company est spécialisée dans la production de biens électroniques. 
          Les services fournis comprennent la fabrication, l’assemblage et la distribution de produits électroniques.
           L’entreprise Wijdane Company emploie 500 collaborateurs à travers plusieurs sites en Suisse. L’entreprise se distingue particulièrement par son engagement envers l’innovation et la qualité.</p>
      </section>
      
      <section className="missions">
        <h2>Missions</h2>
        <p>En tant que Directeur Financier, vous soutiendrez avant tout l’équipe de direction financière.</p>
        <ul>
          <li>Gestion des opérations financières de l'entreprise</li>
          <li>Supervision des équipes comptables et financières</li>
          <li>Élaboration des stratégies financières</li>
          <li>Respect des normes et régulations financières</li>
          <li>Analyse et gestion des risques financiers</li>
        </ul>
      </section>
      
      <section className="profile">
        <h2>Profil requis</h2>
        <h3>Critères obligatoires :</h3>
        <ul>
          <li>Formation: Diplôme en finance, comptabilité ou équivalent</li>
          <li>Expérience: Minimum de 10 ans d’expérience dans un poste similaire</li>
          <li>Compétences: Leadership, gestion de projet, expertise en analyse financière</li>
        </ul>
        <h3>Critères souhaitables :</h3>
        <ul>
          <li>Langues: Français et Anglais courants</li>
          <li>Connaissance de divers outils et programmes: ERP, logiciels de comptabilité</li>
        </ul>
      </section>
      
      <section className="offer">
        <h2>Nous vous offrons</h2>
        <ul>
          <li>Culture d’entreprise/ambiance collaborative</li>
          <li>Horaires de travail flexibles</li>
          <li>Formations continues et développement professionnel</li>
          <li>Environnement de travail dynamique</li>
          <li>Avantages sociaux compétitifs</li>
          <li>Equipe multiculturelle</li>
        </ul>
      </section>
      
      <section className="application-details">
        <h2>Modalités de candidature</h2>
        <p>CV, lettre de motivation, etc. à envoyer jusqu’au 31/07/2024 via la plateforme d’emploi.</p>
      </section>
      <div className="apply-button-container">
        <button className="apply-button" onClick={handleApplyClick}>Postuler</button>
      </div>
    </div>
  );
};

export default Finance;
