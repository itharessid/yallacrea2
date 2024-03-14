import React, { useState } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './evenements.css';
import { Link } from 'react-router-dom';


// Composant pour la boîte de dialogue de confirmation
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

function Evenements() {
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
      <Adminsidbar />
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Trouver un évènement" aria-controls="DataTables_Table_2" /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauEvent" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="row">
          <div className="cardP">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <image href="/src/assets/images/bureau.jpg" width="24" height="24" />
            </svg>
            <div className="cardP__content">
              <p className="cardP__title">Tour</p>
              <p className="cardP__description">Une visite exclusive de l'école à l'intérieur dans les espaces dynamiques.</p>
              <button className="cardP__button">
                <Link to="https://www.facebook.com/photo/?fbid=242417278943734&set=pcb.242417452277050">Photo</Link>
              </button>
              <button className="cardP__button secondary">
                <Link to="https://youtu.be/g3-4BKr0utc?si=X8iY8fQ4vqtcwNer">Vidéo</Link>
              </button>
              {/* Modifier le bouton Supprimer */}
              <button className="cardP__supp" onClick={handleDeleteClick}>
                Supprimer
              </button>
            </div>
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

export default Evenements;
