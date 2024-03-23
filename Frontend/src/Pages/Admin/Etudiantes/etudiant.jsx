import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './etudiant.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>
          <div className="confirmation-buttons">
            <button onClick={handleConfirmDelete} className="confirm-button">
              Oui
            </button>
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
  const [selectedEtudiantId, setSelectedEtudiantId] = useState(null);
  const [EtudiantData, setEtudiantData] = useState([]);
  const [blurBackground, setBlurBackground] = useState(false);

  const handleDeleteClick = (etudiantId) => {
    setSelectedEtudiantId(etudiantId);
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setSelectedEtudiantId(null);
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/etudiant/${selectedEtudiantId}`);
      setShowDeleteConfirmation(false);
      setBlurBackground(false);
      fetchData(); // Mettre à jour les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3001/etudiant");
      setEtudiantData(result.data);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données étudiant :", err);
    }
  };

  return (
    <>
      <Adminsidbar />
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="row">
      <div className="col-xl-3 mb-20">
          <div className="card-box-Etud height-100-p widget-style1">
            <div className="d-flex flex-wrap align-items-center">
              <div className="widget-data">
                <div className="weight-600 font-14 text-purple text-center text-nowrap">Cours Complet</div>
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
                <div className="weight-600 font-14 text-purple text-center text-nowrap">Cours Accéléré</div>
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
                {EtudiantData.map((etudiant, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{etudiant.nom}</td>
                    <td>{etudiant.prenom}</td>
                    <td>{etudiant.email}</td>
                    <td>{etudiant.adresse}</td>
                    <td>{etudiant.numero}</td>
                    <td>{etudiant.niveau}</td>
                    <td>{etudiant.programme}</td>
                    <td>{etudiant.codePromo}</td>
                    <td>
                      <button className="button1">
                        <Link to="/profilEtud" className="dropdown-toggle">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      <button className="button2" onClick={() => handleDeleteClick(etudiant.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
