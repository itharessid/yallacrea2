import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { Link } from 'react-router-dom';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function emploiup() {

  const [emplois, setEmplois] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [createurToDelete, setCreateurToDelete] = useState(null);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteClick = (emploi) => {
    setCreateurToDelete(emploi);
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
    setCreateurToDelete(null);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:3001/emplois/${createurToDelete.idEmplois}`)
      .then(res => {
        fetchEmplois(); // Mettre à jour la liste des emplois après la suppression
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
        setCreateurToDelete(null);
      })
      .catch(err => {
        console.error("Erreur lors de la suppression de l'emploi :", err);
        // Gérer les erreurs de suppression ici
      });
  };

  const fetchEmplois = () => {
    axios.get('http://localhost:3001/emplois')
      .then(res => {
        setEmplois(res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des emplois :", err);
      });
  };

  useEffect(() => {
    fetchEmplois();
  }, []);

  const filteredEmplois = emplois.filter((emploi) => {
    // Filtrer les emplois en fonction du terme de recherche dans le titre ou la description
    return (
      emploi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emploi.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>    
      <Adminsidbar/>
      
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
        <div className="row">
          {/* Votre code pour la section de statistiques */}
        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input
            type="search"
            className="form-control form-control-sm"
            placeholder="Trouver  l'emplois"
            aria-controls="DataTables_Table_2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nvemplois" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box mb-30">
          <div className="pd-20">
            <h4 className="h4">emplois du temps</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple">emplois</th>
                  <th className="text-purple">titre</th>
                  <th className="text-purple">description</th>
                  <th className="text-purple">type de cour</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmplois.map((emploi) => (
                  <tr key={emploi.idEmplois}>
                    <td className="table-plus">{emploi.emplois}</td>
                    <td>{emploi.titre}</td>
                    <td>{emploi.description}</td>
                    <td>{emploi.typedecour}</td>
                    <td>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <button className="button1">
                            <Link to={`/editemplois/${emploi.idEmplois}`} className="dropdown-toggle">
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </button>
                        </div>
                        <div>
                          <button className="button2" onClick={() => handleDeleteClick(emploi)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </div>
                    </td>     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
        {/* Confirmation de la suppression */}
        
      </div>
      {showDeleteConfirmation && (
          <div className="cardconfirmation-dialog">
            <div className="card-body confirmation-dialog-content">
              <p>Êtes-vous sûr de vouloir supprimer {createurToDelete.titre}  ?</p>
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
        )}
    </>
  );
}

export default emploiup;
