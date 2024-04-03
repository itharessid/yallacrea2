import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import axios from 'axios'; // Importez Axios pour effectuer des requêtes HTTP

function Bienvenue() {
  const [createursCount, setCreateursCount] = useState(0);
  const [etudiantsCount, setEtudiantsCount] = useState(0);
  const [domainesCount, setDomainesCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const createursResult = await axios.get("http://localhost:3001/createur");
      setCreateursCount(createursResult.data.length);

      const etudiantsResult = await axios.get("http://localhost:3001/etudiant");
      setEtudiantsCount(etudiantsResult.data.length);

      const domainesResult = await axios.get("http://localhost:3001/domaine");
      setDomainesCount(domainesResult.data.length);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données :", err);
    }
  };

  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="pd-ltr-20">
          <div className="card-box pd-10 mb-30">
            <div className="row align-items-center">
              <div className="col-md-3 d-flex justify-content-center">
                <img src="src/assets/images/wajdi.jpg" alt="" />
              </div>
              <div className="col-md-9">
                <h4 className="font-18 mb-10 text-capitalize">
                  Bonjour <span className="font-weight-bold font-22 text-purple">Wajdi Chebaane</span>
                </h4>
                <p className="font-18 max-width-600">Voici sur votre espace administratif dédié, conçu pour vous permettre de consulter et de gérer les activités de notre école à distance. <br />Grâce à cet outil, vous restez constamment informé et à jour, vous permettant ainsi de prendre des décisions éclairées pour le bien-être de notre communauté éducative.</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-3 mb-20">
              <div className="card-box-Etud height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-center text-nowrap">Createurs</div>
                    <div className="h6 mb-0 text-center">{createursCount}</div>
                  </div>
                  <img src="src/assets/images/createurs.png" alt="" style={{marginLeft: '40px'}}/>
                </div>
              </div>
            </div>

            <div className="col-xl-3 mb-20">
              <div className="card-box-Etud height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-center text-nowrap">Etudiants</div>
                    <div className="h6 mb-0 text-center">{etudiantsCount}</div>
                  </div>
                  <img src="src/assets/images/etudiant.png" alt="" style={{marginLeft: '40px'}}/>
                </div>
              </div>
            </div>

            <div className="col-xl-3 mb-20">
              <div className="card-box-Etud height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-center text-nowrap">Domaine</div>
                    <div className="h6 mb-0 text-center">{domainesCount}</div>
                  </div>
                  <img src="src/assets/images/domaines.png" alt="" style={{marginLeft: '40px'}}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 md-20">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Suivie sur Facebook</div>
                    <div className="h6 mb-0 text-center">54.000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 md-20">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Suivie sur Instagram</div>
                    <div className="h6 mb-0 text-center">10.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 md-20">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Suivie sur TikTok</div>
                    <div className="h6 mb-0 text-center">20.000</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 md-20">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Suivie sur Youtube</div>
                    <div className="h6 mb-0 text-center">5.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Bienvenue;
