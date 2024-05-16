import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './domaines.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, domaineToDelete }) {
    return (
      showDeleteConfirmation && domaineToDelete && (
        <div className="cardconfirmation-dialog">
          <div className="card-body confirmation-dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer {domaineToDelete.nomDomaine}?</p>
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
  
function Domaines (){
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedDomaineId, setSelectedDomaineId] = useState(null);
    const [domaineToDelete, setDomaineToDelete] = useState(null); // Nouveau state pour l'étudiant à supprimer
    const [DomaineData, setDomaineData] = useState([]);
    const [blurBackground, setBlurBackground] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
      }, []);

      // Dans la fonction fetchData, triez les données récupérées par nom de domaine
      const fetchData = async () => {
        try {
          const result = await axios.get("http://localhost:3001/domaine");
          // Tri des données par nom de domaine
          result.data.sort((a, b) => a.nomDomaine.localeCompare(b.nomDomaine));
          setDomaineData(result.data);
        } catch (err) {
          console.log("Quelque chose s'est mal passé lors de la récupération des données domaine :", err);
        }
      };
      const handleDeleteClick = (domaine) => {
        setSelectedDomaineId(domaine.idDomaine);
        setDomaineToDelete(domaine); 
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
      };
    
      const handleCancelDelete = () => {
        setSelectedDomaineId(null);
        setDomaineToDelete(null);
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
      };
      const handleConfirmDelete = async () => {
        try {
          await axios.delete(`http://localhost:3001/domaine/${selectedDomaineId}`);
          setShowDeleteConfirmation(false);
          setBlurBackground(false);
          setDomaineToDelete(null);
          fetchData(); // Mettre à jour les données après suppression
        } catch (error) {
          console.error("Erreur lors de la suppression de domaine:", error);
        }
      };
    
      const filteredDomaine = searchTerm
        ? DomaineData.filter(
            (domaine) =>
              `${domaine.nomDomaine.toLowerCase()}`.includes(searchTerm.toLowerCase())
          )
        : DomaineData;
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
    return (
        <>
        <Adminsidbar/>
        <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
      <div className="row">
          <div className="col-xl-3 mb-20">
            <div className="card-box-Etud height-100-p widget-style1">
              <div className="d-flex flex-wrap align-items-center">
                <div className="widget-data">
                  <div className="weight-600 font-14 text-purple text-center text-nowrap">Domaines</div>
                  <div className="h6 mb-0 text-center">{filteredDomaine.length}</div> 
                </div>
                <img src="src/assets/images/domaines.png" alt="" style={{ marginLeft: '40px' }} />
              </div>
            </div>
          </div>
        </div>
        <div className="DataTables_Table_2_filter">
          <label style={{ marginRight: '10px' }}>Rechercher:<input
            type="search"
            className="form-control form-control-sm"
            placeholder="Trouver un domaine"
            aria-controls="DataTables_Table_2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /></label>
          <button className="button1" style={{ marginLeft: '10px' }}>
            <Link to="/NDomaine" className="dropdown-toggle">
              <span className="mtext">Nouveau</span>
            </Link>
          </button>
        </div>
        <div className="card-box mb-30">
          <div className="pd-20">
            <h4 className="h4">Domaines</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple"></th>
                  <th className="text-purple">Domaine</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
                <tbody>
                  {filteredDomaine.map((domaine, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{capitalizeFirstLetter(domaine.nomDomaine)}</td>
                      <td>
                        <button className="button2" onClick={() => handleDeleteClick(domaine)}>
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
          domaineToDelete={domaineToDelete}
        />
        </>
    )

}
export default Domaines;