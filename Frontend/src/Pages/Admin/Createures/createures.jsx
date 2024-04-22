import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './createures.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, createurToDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer {createurToDelete.nom} {createurToDelete.prenom} ?</p>
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

function Createurs() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedCreateurId, setSelectedCreateurId] = useState(null);
  const [createurToDelete, setCreateurToDelete] = useState(null); // Nouveau state pour l'étudiant à supprimer
  const [createurData, setCreateurData] = useState([]);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/createur");
      setCreateurData(result.data);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données créateurs :", err);
    }
  };

  const handleDeleteClick = (createur) => {
    setSelectedCreateurId(createur.idCreateur);
    setCreateurToDelete(createur); // Définir l'étudiant à supprimer
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setSelectedCreateurId(null);
    setCreateurToDelete(null); // Remettre à null l'étudiant à supprimer
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/createur/${selectedCreateurId}`);
      setShowDeleteConfirmation(false);
      setBlurBackground(false);
      setCreateurToDelete(null); 
      fetchData(); 
    } catch (error) {
      console.error("Erreur lors de la suppression de créateur :", error);
    }
  };

  const filteredCreateurs = searchTerm
    ? createurData.filter(
        (createur) =>
          `${createur.nom.toLowerCase()} ${createur.prenom.toLowerCase()} ${createur.domaine.toLowerCase()}`.includes(searchTerm.toLowerCase())
      )
    : createurData;

  return (
    <>
      <Adminsidbar />
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="row">
          <div className="col-xl-3 mb-20">
            <div className="card-box-Etud height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="weight-600 font-14 text-purple text-center text-nowrap">Createurs</div>
                  <div className="h6 mb-0 text-center">{filteredCreateurs.length}</div> 
                </div>
                <img src="src/assets/images/creation.png" alt="" style={{ marginLeft: '40px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Trouver un créateur"
            aria-controls="DataTables_Table_2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauCrea" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box mb-30">
          <div className="pd-20">
            <h4 className="h4">createurs</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple"></th>
                  <th className="text-purple">Photo</th>
                  <th className="text-purple">Nom</th>
                  <th className="text-purple">Prénom</th>
                  <th className="text-purple">Email</th>
                  <th className="text-purple">Domaine</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreateurs.map((createur, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`/photo/${createur.image}`} alt="Photo de profil" style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '80%' }} />
                    </td>
                    <td>{createur.nom}</td>
                    <td>{createur.prenom}</td>
                    <td>
                      <a href={`mailto:${createur.email}`}>
                        {createur.email}
                      </a>
                    </td>
                    <td>{createur.domaine}</td>
                    <td>
                      <button className="button1">
                        <Link to={`/profilCrea/${createur.idCreateur}`} className="dropdown-toggle">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      <button className="button2" onClick={() => handleDeleteClick(createur)}>
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
        createurToDelete={createurToDelete} 
      />
    </>
  );
}

export default Createurs;
