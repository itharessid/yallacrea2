import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import axios from 'axios';
import './bienvenue.css';
import { createPieChart } from './chart-pie-demo.js';
import { Link } from 'react-router-dom';

function Bienvenue() {
  const [createursCount, setCreateursCount] = useState(0);
  const [etudiantsCount, setEtudiantsCount] = useState(0);
  const [domainesCount, setDomainesCount] = useState(0);
  const [expertCount, setExpertCount] = useState(0);
  const [partenaireCount, setPartenaireCount] = useState(0);
  const [pEtudCount, setPEtudCount] = useState(0);
  const [pCreaCount, setPCreaCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [hoveredSlice, setHoveredSlice] = useState(null); // État pour suivre la tranche survolée
  const [isHovered, setIsHovered] = useState(false); // État pour suivre si la souris est sur la partie 3D

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    createPieChart(createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount);
  }, [createursCount, etudiantsCount, domainesCount, expertCount, partenaireCount, pEtudCount, pCreaCount, eventsCount]);

  const fetchData = async () => {
    try {
      const createursResult = await axios.get("http://localhost:3001/createur");
      setCreateursCount(createursResult.data.length);

      const etudiantsResult = await axios.get("http://localhost:3001/etudiant");
      setEtudiantsCount(etudiantsResult.data.length);

      const domainesResult = await axios.get("http://localhost:3001/domaine");
      setDomainesCount(domainesResult.data.length);

      const preEtudResult = await axios.get("http://localhost:3001/preinscriEtudiant");
      setPEtudCount(preEtudResult.data.length);

      const preCreaResult = await axios.get("http://localhost:3001/preinscriCrea");
      setPCreaCount(preCreaResult.data.length);

      const expertResult = await axios.get("http://localhost:3001/experget");
      setExpertCount(expertResult.data.length);

      const partenaireResult = await axios.get("http://localhost:3001/partenaireget");
      setPartenaireCount(partenaireResult.data.length);

      const eventsResult = await axios.get("http://localhost:3001/evenements");
      setEventsCount(eventsResult.data.length);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données :", err);
    }
  };

  const imageStyle = {
    width: '250px',
    height: '180px',
    borderRadius: '-200%',
    objectFit: 'cover',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, .18)',
    transition: 'transform 0.3s ease', // Animation de transition pour la transformation
    transform: isHovered ? 'rotateY(45deg)' : 'rotateY(0deg)' // Appliquer la transformation 3D lorsque la souris est sur la partie
  };

  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="pd-ltr-20">
          <div className="card-box pd-10 mb-30">
            <div className="row align-items-center">
              <div className="col-md-3 d-flex justify-content-center">
                <img 
                  src="src/assets/images/wajdi.jpg" 
                  alt="" 
                  style={imageStyle}
                  onMouseEnter={() => setIsHovered(true)} // Lorsque la souris entre dans l'image, définir isHovered à true
                  onMouseLeave={() => setIsHovered(false)} // Lorsque la souris quitte l'image, définir isHovered à false
                />
              </div>
              <div className="col-md-9">
                <h4 className="font-18 mb-10 text-capitalize">
                  Bonjour <span className="font-weight-bold font-22 text-purple">Wajdi Chebaane</span>
                </h4>
                <p className="font-18 max-width-600">Voici sur votre espace administratif dédié, conçu pour vous permettre de consulter et de gérer les activités de notre école à distance. <br />Grâce à cet outil, vous restez constamment informé et à jour, vous permettant ainsi de prendre des décisions éclairées pour le bien-être de notre communauté éducative.</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center"> {/* Centrer le contenu */}
            <div className="col-xl-6 col-lg-8"> {/* Utilisez les classes Bootstrap pour centrer le contenu */}
              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  <canvas id="myPieChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6">
            {/* Votre contenu existant ici */}
            <div className="mt-4 text-right small">
              <span className="mr-2">
                <Link to="/evenements" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Event"></i> {eventsCount} Événements
                </Link>
              </span>
              <span className="mr-2">
                <Link to="/createures" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Crea"></i> {createursCount} Créateurs
                </Link>
              </span>
              <span className="mr-2">
                <Link to="/etudiants" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Etud"></i> {etudiantsCount} Étudiants
                </Link>
              </span><br/>
              <span className="mr-2">
                <Link to="/domaines" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Dom"></i> {domainesCount} Domaines
                </Link>
              </span>
              <span className="mr-2">
                <Link to="/expert" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Exp"></i> {expertCount} Experts
                </Link>
              </span>
              <span className="mr-2">
                <Link to="/partenaire" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-Part"></i> {partenaireCount} Partenaires
                </Link>
              </span><br/>
              <span className="mr-2">
                <Link to="/preInscriptionEtud" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-PEtud"></i> {pEtudCount} Pré-inscriptions des étudiants
                </Link>
              </span><br/>
              <span className="mr-2">
                <Link to="/preInscriptionCrea" className="text-decoration-none text-dark">
                  <i className="fas fa-circle text-PCrea"></i> {pCreaCount} Pré-inscriptions des créateurs
                </Link>
              </span><br/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bienvenue;
