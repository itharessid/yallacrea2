import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './expert.css';

function Experts() {
    const [expertsData, setExpertsData] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [expertToDelete, setExpertToDelete] = useState(null);
    const [expertToDeleteInfo, setExpertToDeleteInfo] = useState(null); // Ajouter un état pour stocker les informations de l'expert à supprimer
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/experget')
            .then(res => {
                setExpertsData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteClick = (expertId) => {
        setExpertToDelete(expertId);
        // Récupérer les informations de l'expert à supprimer lorsqu'il est cliqué
        const expertInfoToDelete = expertsData.find(expert => expert.id === expertId);
        setExpertToDeleteInfo(expertInfoToDelete);
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
    };

    const handleConfirmDelete = () => {
        if (!expertToDelete) return;

        axios.delete(`http://localhost:3001/experget/${expertToDelete}`)
            .then(res => {
                setExpertsData(expertsData.filter(expert => expert.id !== expertToDelete));
            })
            .catch(err => console.log(err));
        
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
        setExpertToDelete(null);
        setExpertToDeleteInfo(null); // Réinitialiser les informations de l'expert à supprimer
    };

    // Fonction pour filtrer les experts en fonction de la valeur de recherche
    const filteredExperts = expertsData.filter(expert =>
        expert.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
        expert.prenom.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Adminsidbar />
            <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
                <div className="row">
                    <div className="col-xl-3 mb-20">
                        <div className="card-box-Etud height-100-p widget-style1">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="widget-data">
                                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Experts</div>
                                    <div className="h6 mb-0 text-center">{expertsData.length}</div> {/* Afficher le nombre d'experts */}
                                </div>
                                <img src="src/assets/images/experts.png" alt="" style={{ marginLeft: '40px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="DataTables_Table_2_filter">
                    <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Trouver l'expert" aria-controls="DataTables_Table_2" onChange={(e) => setSearchValue(e.target.value)} /></label>
                    <button className="button1" style={{ marginLeft: '10px' }}>
                        <Link to="/Nvexpert" className="dropdown-toggle">
                            <span className="mtext">Nouveau</span>
                        </Link>
                    </button>
                </div>
                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="h4">Experts</h4>
                    </div>
                    <div className="pb-20">
                        <table className="table hover multiple-select-row data-table-export nowrap">
                            <thead>
                                <tr>
                                    <th className="text-purple">Photo</th>
                                    <th className="table-plus datatable-nosort text-purple">Nom</th>
                                    <th className="text-purple">Prénom</th>
                                    <th className="text-purple">Email</th>
                                    <th className="text-purple">Numéro</th>
                                    <th className="text-purple">Poste</th> {/* Nouvelle colonne pour le poste */}
                                    <th className="text-purple">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExperts.map((expert, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`http://localhost:3001/photo/${expert.photo}`} alt="Photo de profil" style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '80%' }} />
                                        </td>
                                        <td className="table-plus">{expert.nom}</td>
                                        <td>{expert.prenom}</td>
                                        <td>{expert.Email}</td>
                                        <td>{expert.telef}</td>
                                        <td>{expert.poste}</td> {/* Affichage du poste */}
                                        <td>
                                            <button className="button1">
                                                <Link to={`/profilexp/${expert.id}`} className="dropdown-toggle">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </button>
                                            <button className="button2" onClick={() => handleDeleteClick(expert.id)}>
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
            {/* Affichage du composant de confirmation de suppression en dessous du flux principal */}
            {showDeleteConfirmation && (
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
            )}
            {/* Affichage du composant de confirmation de suppression en dessous du flux principal */}
            {showDeleteConfirmation && (
                <div className="cardconfirmation-dialog">
                    <div className="card-body confirmation-dialog-content">
                        {/* Afficher le nom et le prénom de l'expert à supprimer */}
                        <p>Êtes-vous sûr de vouloir supprimer {expertToDeleteInfo.nom} {expertToDeleteInfo.prenom} ?</p>
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

export default Experts;
