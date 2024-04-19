import React, { useState,useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './evenements.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



// Composant pour la boîte de dialogue de confirmation
function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete,eventToDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer {eventToDelete.titre} ?</p>
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
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null); // Nouveau state pour l'étudiant à supprimer
  const [eventData, setEventData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/evenements");
      setEventData(result.data);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données évènements :", err);
    }
  };

  // Fonction pour afficher la boîte de dialogue de confirmation de suppression
  const handleDeleteClick = (event) => {
    setSelectedEventId(event.id);
    setEventToDelete(event); // Set the event to delete
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };
  

  // Fonction pour masquer la boîte de dialogue de confirmation de suppression
  const handleCancelDelete = () => {
    setSelectedEventId(null);
    setEventToDelete(null); // Remettre à null l'étudiant à supprimer
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  // Fonction pour traiter la suppression réelle
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/evenements/${selectedEventId}`);
      setShowDeleteConfirmation(false);
      setBlurBackground(false);
      setEventToDelete(null); 
      fetchData(); 
    } catch (error) {
      console.error("Erreur lors de la suppression de l'évènement :", error);
    }
  };
  const filteredEvents = searchTerm
  ? eventData.filter(
      (event) =>
        `${event.titre.toLowerCase()}`.includes(searchTerm.toLowerCase())
    )
  : eventData;


  return (
    <>
      <Adminsidbar />
      <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="row">
          <div className="col-xl-3 mb-20">
            <div className="card-box-Etud height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="weight-600 font-14 text-purple text-center text-nowrap">Évènements</div>
                  <div className="h6 mb-0 text-center">{filteredEvents.length}</div> 
                </div>
                <img src="src/assets/images/évènement.png" alt="" style={{ marginLeft: '40px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input
            type="search"
            className="form-control form-control-sm"
            placeholder="Trouver un évènement"
            aria-controls="DataTables_Table_2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/nouveauEvent" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box height-100-p widget-style1 bigger-card">
          <div className="pd-20">
            <h4 className="h4">Évènements</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple"></th>
                  <th className="text-purple">Photo</th>
                  <th className="text-purple">Titre</th>
                  <th className="text-purple">Description</th>
                  <th className="text-purple">Lien Photos</th>
                  <th className="text-purple">Lien Vidéo</th>
                  <th className="text-purple">Date</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={`/photo/${event.image}`} alt="Photo de profil" style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '80%' }} />
                    </td>
                    <td>{event.titre}</td>
                    <td>{event.description}</td>
                    <td>
                      <a href={event.lienphotos} target="_blank" rel="noopener noreferrer">
                        {event.lienphotos}
                      </a>
                    </td>
                    <td>
                      <a href={event.lienvideo} target="_blank" rel="noopener noreferrer">
                        {event.lienvideo}
                      </a>
                    </td>
                    <td>{event.dateevent ? new Date(event.dateevent).toLocaleDateString('fr-FR') : '-'}</td>
                    <td style={{ display: 'flex', flexDirection: 'row' }}>
                    <button className="button1">
                        <Link to={`/event/${event.id}`} className="dropdown-toggle">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      <button className="button2" onClick={() => handleDeleteClick(event)}>
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
        eventToDelete={eventToDelete} 
      />
    </>
  );
}

export default Evenements;
