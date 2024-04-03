import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete }) {
    return (
      showDeleteConfirmation && (
        <div className="cardconfirmation-dialog">
          <div className="card-body confirmation-dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer cet créateur ?</p>
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


function emploiup() {
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
  return (
   <>    
    <Adminsidbar/>
    <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
        <div className="row">
        <div className="col-xl-3 mb-20">
     <div className="card-box-Etud height-100-p widget-style1">
    <div className="d-flex flex-wrap align-items-center">
      <div className="widget-data">
        <div className="weight-600 font-14 text-purple text-center text-nowrap">emplois du temps</div>
        <div className="h6 mb-0 text-center">40</div>
      </div>
      <img src="src/assets/images/evenement.png" alt="" style={{ width: '40px',  marginLeft: '40px',height: '40px'}} />
    </div>
  </div>
</div>

        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Trouver un créateur" aria-controls="DataTables_Table_2" /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauCrea" className="dropdown-toggle">
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
                  <th className="table-plus datatable-nosort text-purple">Image</th>
                  <th className="text-purple">lien</th>
                  <th className="text-purple">description</th>
                  <th className="text-purple">Description</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-plus">ELFEKIH</td>
                  <td>Ons</td>
                  <td>elfekihons@gmail.com</td>
                 
                  <td>
                    <button className="button1">
                      <Link to="/profilCrea" className="dropdown-toggle">
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </button>
                    <button className="button2" onClick={handleDeleteClick}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="table-plus">ESSID</td>
                  <td>Ithar</td>
                  <td>ithar333@gmail.com</td>
                  
                  <td>
                    <button className="button1">
                      <Link to="/profilCrea" className="dropdown-toggle">
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </button>
                    <button className="button2" onClick={handleDeleteClick}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Boîte de dialogue de confirmation */}
        {showDeleteConfirmation && (
          <div className="cardconfirmation-dialog">
            <div className="card-body confirmation-dialog-content">
              <p>Êtes-vous sûr de vouloir supprimer cet emploi?</p>
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

</>
  )
}

export default emploiup
