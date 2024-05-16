import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './etudiant.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, etudiantToDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer {etudiantToDelete.nom} {etudiantToDelete.prenom} ?</p>
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
  const [etudiantToDelete, setEtudiantToDelete] = useState(null); // Nouveau state pour l'étudiant à supprimer
  const [EtudiantData, setEtudiantData] = useState([]);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  // Dans la fonction fetchData, triez les données récupérées par nom avant de les stocker dans EtudiantData
  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/etudiant");
      // Tri des données par nom
      result.data.sort((a, b) => a.nom.localeCompare(b.nom));
      setEtudiantData(result.data);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données étudiant :", err);
    }
  };

  const handleDeleteClick = (etudiant) => {
    setSelectedEtudiantId(etudiant.id);
    setEtudiantToDelete(etudiant); // Définir l'étudiant à supprimer
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setSelectedEtudiantId(null);
    setEtudiantToDelete(null); // Remettre à null l'étudiant à supprimer
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/etudiant/${selectedEtudiantId}`);
      setShowDeleteConfirmation(false);
      setBlurBackground(false);
      setEtudiantToDelete(null); // Remettre à null l'étudiant à supprimer après suppression
      fetchData(); // Mettre à jour les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
    }
  };

  const filteredEtudiants = searchTerm
    ? EtudiantData.filter(
        (etudiant) =>
          `${etudiant.nom.toLowerCase()} ${etudiant.prenom.toLowerCase()} ${etudiant.programme.toLowerCase()} ${etudiant.niveau.toLowerCase()}`.includes(searchTerm.toLowerCase())
      )
    : EtudiantData;
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
                  <div className="weight-600 font-14 text-purple text-center text-nowrap">Etudiants</div>
                  <div className="h6 mb-0 text-center">{filteredEtudiants.length}</div> {/* Utiliser la longueur de filteredEtudiants */}
                </div>
                <img src="src/assets/images/etudiant.png" alt="" style={{ marginLeft: '40px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input
            type="search"
            className="form-control form-control-sm"
            placeholder="Trouver un étudiant"
            aria-controls="DataTables_Table_2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauEtud" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box mb-30 bigger-card1">
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
                  <th className="text-purple">num</th>
                  <th className="text-purple">Niveau</th>
                  <th className="text-purple">Programme</th>
                  <th className="text-purple">Code Promo</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEtudiants.map((etudiant, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{etudiant.nom.toUpperCase()}</td>
                    <td>{capitalizeFirstLetter(etudiant.prenom)}</td>
                    <td>
                      <a href={`mailto:${etudiant.email}`}>
                        {etudiant.email}
                      </a>
                    </td>
                    <td>{etudiant.adresse}</td>
                    <td>{etudiant.num}</td>
                    <td>{etudiant.niveau}</td>
                    <td>{etudiant.programme}</td>
                    <td>{etudiant.codePromo}</td>
                    <td style={{ display: 'flex', flexDirection: 'row' }}>
                      <button className="button1" style={{ marginRight: '10px' }}>
                        <Link to={`/profilEtud/${etudiant.id}`} className="dropdown-toggle">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      <button className="button2" onClick={() => handleDeleteClick(etudiant)}>
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
          etudiantToDelete={etudiantToDelete} // Passer l'étudiant à supprimer au composant ConfirmationDialog
        />
    </>
  );
}

export default Etudiants;
