import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './etudiant.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Composant pour la boîte de dialogue de confirmation
function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
          <div className="confirmation-buttons">
            {/* Bouton de confirmation */}
            <button onClick={handleConfirmDelete} className="confirm-button">
              Oui
            </button>
            {/* Bouton d'annulation */}
            <button onClick={handleCancelDelete} className="cancel-button">
              Non
            </button>
          </div>
        </div>
      </div>
    )
  );
}

function Etudiants() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  // Fonction pour afficher la boîte de dialogue de confirmation de suppression
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  // Fonction pour masquer la boîte de dialogue de confirmation de suppression
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  // Fonction pour traiter la suppression réelle
  const handleConfirmDelete = () => {
    // Mettez ici la logique de suppression
    // Après la suppression réussie, vous pouvez rediriger ou effectuer toute autre action nécessaire
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };
  const [EtudiantData,setEtudiantData]=useState([]);
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData=async()=>{
    try{
      const result =await axios("http://localhost:3001/etudiant");
      //console.log(result.data);
      setEtudiantData(result.data)
    }catch(err){
      console.log("qu'elle que chose qui cloche");
    }
  }

  return (
    <>
      <Adminsidbar />
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="row">
      <div className="col-xl-3 mb-20">
  <div className="card-box-Etud height-100-p widget-style1">
    <div className="d-flex flex-wrap align-items-center">
      <div className="widget-data">
        <div className="weight-600 font-14 text-purple text-center text-nowrap">3 mois</div>
        <div className="h6 mb-0 text-center">20</div>
      </div>
      <img src="src/assets/images/etudiant.png" alt="" style={{marginLeft: '40px'}}/>
    </div>
  </div>
</div>

<div className="col-xl-3 mb-20">
  <div className="card-box-Etud height-100-p widget-style1">
    <div className="d-flex flex-wrap align-items-center">
      <div className="widget-data">
        <div className="weight-600 font-14 text-purple text-center text-nowrap">6 mois</div>
        <div className="h6 mb-0 text-center">20</div>
      </div>
      <img src="src/assets/images/etudiant.png" alt="" style={{marginLeft: '40px'}}/>
    </div>
  </div>
</div>

<div className="col-xl-3 mb-20">
  <div className="card-box-Etud height-100-p widget-style1">
    <div className="d-flex flex-wrap align-items-center">
      <div className="widget-data">
        <div className="weight-600 font-14 text-purple text-center text-nowrap">1 an</div>
        <div className="h6 mb-0 text-center">20</div>
      </div>
      <img src="src/assets/images/etudiant.png" alt="" style={{marginLeft: '40px'}} />
    </div>
  </div>
</div>

<div className="col-xl-3 mb-20">
  <div className="card-box-Etud height-100-p widget-style1">
    <div className="d-flex flex-wrap align-items-center">
      <div className="widget-data">
        <div className="weight-600 font-14 text-purple text-center text-nowrap">3 ans</div>
        <div className="h6 mb-0 text-center">20</div>
      </div>
      <img src="src/assets/images/etudiant.png" alt="" style={{marginLeft: '40px'}}/>
    </div>
  </div>
</div>

</div>

        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Trouver un étudiant" aria-controls="DataTables_Table_2" /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauEtud" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box mb-30">
          <div className="pd-20">
            <h4 className="h4">Etudiants</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple"></th>
                  <th className="text-purple">Nom</th>
                  <th className="text-purple">Prénom</th>
                  <th className="text-purple">Email</th>
                  <th className="text-purple">Adresse</th>
                  <th className="text-purple">Numéro</th>
                  <th className="text-purple">Niveau</th>
                  <th className="text-purple">Programme</th>
                  <th className="text-purple">Code Promo</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  EtudiantData.map((etudiants,i)=>{
                    return (
                     <tr key={i}>
                      <td>{i+1}</td>
                      <td>{etudiants.nom}</td>
                      <td>{etudiants.prenom}</td>
                      <td>{etudiants.email}</td>
                      <td>{etudiants.adresse}</td>
                      <td>{etudiants.numero}</td>
                      <td>{etudiants.niveau}</td>
                      <td>{etudiants.programme}</td>
                      <td>{etudiants.codePromo}</td>
                      <td>
                    <button className="button1">
                      <Link to="/profilEtud" className="dropdown-toggle">
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </button>
                    <button className="button2" onClick={handleDeleteClick}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                     </tr> 
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {/* Boîte de dialogue de confirmation */}
        {showDeleteConfirmation && (
          <div className="cardconfirmation-dialog">
            <div className="card-body confirmation-dialog-content">
              <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
              <div className="confirmation-buttons">
                {/* Bouton de confirmation */}
                <button onClick={handleConfirmDelete} className="confirm-button">
                  Oui
                </button>
                {/* Bouton d'annulation */}
                <button onClick={handleCancelDelete} className="cancel-button">
                  Non
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ConfirmationDialog
        showDeleteConfirmation={showDeleteConfirmation}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </>
  );
}

export default Etudiants;
