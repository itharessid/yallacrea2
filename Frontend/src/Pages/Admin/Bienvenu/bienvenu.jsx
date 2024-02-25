import React from 'react';
import Adminsidbar from '../sidbar/Adminsidbar';

function Bienvenue() {
  return (
    <>
      <Adminsidbar />
      <div className="main-container">
        <div className="pd-ltr-20">
          <div className="card-box pd-10 mb-30">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src="src/assets/images/team2.jpg" alt="" />
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
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100 -p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14">Étudiants</div>
                    <div className="h6 mb-0">40</div>
                  </div>
                  <img src="src/assets/images/etudiant.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14">Créateurs</div>
                    <div className="h6 mb-0">40</div>
                  </div>
                  <img src="src/assets/images/createurs.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data">
                    <div className="weight-600 font-14">Evènements</div>
                    <div className="h6 mb-0">20</div>
                  </div>
                  <img src="src/assets/images/evenements.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data" style={{ width: "100%" }}>
                    <div className="weight-600 font-14 text-purple text-center">Suivie sur Facebook</div>
                    <div className="h6 mb-0 text-center">54.000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data" style={{ width: "100%" }}>
                    <div className="weight-600 font-14 text-purple text-center">Suivie sur Instagram</div>
                    <div className="h6 mb-0 text-center">10.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data" style={{ width: "100%" }}>
                    <div className="weight-600 font-14 text-purple text-center">Suivie sur TikTok</div>
                    <div className="h6 mb-0 text-center">20.000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 mb-30">
              <div className="card-box height-100-p widget-style1">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="widget-data" style={{ width: "100%" }}>
                    <div className="weight-600 font-14 text-purple text-center">Suivie sur Youtube</div>
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
