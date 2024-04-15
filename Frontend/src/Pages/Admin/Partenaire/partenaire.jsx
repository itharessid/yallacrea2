import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './partenaire.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Importez Axios

function Partenaire() {
    const [partenaires, setPartenaires] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [partenaireToDelete, setPartenaireToDelete] = useState(null); // Stockez les données du partenaire à supprimer
    const [searchValue, setSearchValue] = useState('');
    const [nombrePartenaires, setNombrePartenaires] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/partenaireget')
            .then(res => {
                setPartenaires(res.data); // Utilisez setPartenaires au lieu de setExpertsData
                setNombrePartenaires(res.data.length);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteClick = (partenaire) => {
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
        setPartenaireToDelete(partenaire); // Stockez les données du partenaire à supprimer
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
    };

    const handleConfirmDelete = () => {
        // Envoie une requête DELETE pour supprimer le partenaire
        axios.delete(`http://localhost:3001/partenaire/${partenaireToDelete.id}`)
            .then(res => {
                // Si la suppression est réussie, mettez à jour la liste des partenaires
                setPartenaires(prevPartenaires => prevPartenaires.filter(partenaire => partenaire.id !== partenaireToDelete.id));
                // Mettre à jour le nombre de partenaires
                setNombrePartenaires(prevNombre => prevNombre - 1);
                // Réinitialisez les états
                setShowDeleteConfirmation(false);
                setBlurBackground(false);
                setPartenaireToDelete(null);
            })
            .catch(err => console.log(err));
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredPartenaires = partenaires.filter(partenaire =>
        partenaire.nomSociete.toLowerCase().includes(searchValue.toLowerCase())
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
                                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Partenaires</div>
                                    <div className="h6 mb-0 text-center">{nombrePartenaires}</div> {/* Afficher le nombre de partenaires */}
                                </div>
                                <img src="src/assets/images/partenaire.png" alt="" style={{ marginLeft: '40px' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="DataTables_Table_2_filter">
                    <label style={{ marginRight: '10px' }}>Rechercher:<input type="search" className="form-control form-control-sm" placeholder="Trouver partenaire " aria-controls="DataTables_Table_2" value={searchValue} onChange={handleSearchChange} /></label>
                    <button className="button1" style={{ marginLeft: '10px' }}>
                        <Link to="/Nvpartenaire" className="dropdown-toggle">
                            <span className="mtext">Nouveau</span>
                        </Link>
                    </button>
                </div>
                <div className="card-box mb-30">
                    <div className="pd-20">
                        <h4 className="h4">Partenaire</h4>
                    </div>
                    <div className="pb-20">
                        <table className="table hover multiple-select-row data-table-export nowrap">
                            <thead>
                                <tr>
                                    <th className="text-purple">Photo</th>
                                    <th className="table-plus datatable-nosort text-purple">Nom de Société</th>
                                    <th className="text-purple">Numéro</th>
                                    <th className="text-purple">Email</th>
                                    <th className="text-purple">Lien</th>

                                    <th className="text-purple">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPartenaires.map(partenaire => (
                                    <tr key={partenaire.id}>
                                        <td>
                                            <img src={`/photo/${partenaire.logo}`} alt="Photo de profil"  style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '80%' }} />
                                        </td>
                                        <td className="table-plus">{partenaire.nomSociete}</td>
                                        <td>{partenaire.numero}</td>
                                        <td>{partenaire.email}</td>
                                        <td>{partenaire.lien}</td>

                                        <td>
                                            <button className="button1">
                                                <Link to={`/profilpart/${partenaire.id}`} className="dropdown-toggle">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </button>
                                            <button className="button2" onClick={() => handleDeleteClick(partenaire)}>
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
            {showDeleteConfirmation && (
                <div className="cardconfirmation-dialog">
                    <div className="card-body confirmation-dialog-content">
                        {/* Affichez le nom et le prénom de l'expert à supprimer */}
                        <p>Êtes-vous sûr de vouloir supprimer {partenaireToDelete ? `${partenaireToDelete.nomSociete}` : ''} ?</p>
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

export default Partenaire;
