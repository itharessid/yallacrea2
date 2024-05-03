import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './preInscription.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, creaToDelete, handleDelete }) {
    return (
        showDeleteConfirmation && (
            <div className="cardconfirmation-dialog">
                <div className="card-body confirmation-dialog-content">
                    <p>Êtes-vous sûr de vouloir supprimer {creaToDelete.nom} {creaToDelete.prenom} ?</p>
                    <div className="confirmation-buttons">
                        <button onClick={()=>{
                          handleDelete(creaToDelete); // Appeler handleDelete avec l'étudiant à supprimer
                          handleConfirmDelete()}} 
                          className="confirm-button">
                            Oui
                        </button>
                        <button onClick={() => {  
                            handleCancelDelete(); // Ensuite, annuler la suppression
                        }} 
                        className="cancel-button">
                            Non
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

function PreInscriptionCrea() {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedPCreaId, setSelectedPCreaId] = useState(null);
    const [PCreaToDelete, setPCreaToDelete] = useState(null);
    const [PCreaData, setPCreaData] = useState([]);
    const [blurBackground, setBlurBackground] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleValidation = async (createur) => {
        alert(`La pré-inscription de ${createur.nom} ${createur.prenom} est validée.`);
        
        try {
            await axios.post('http://localhost:3001/sendEmailCrea', {
                createur: createur
            });
            console.log("E-mail envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    };

    const handleDelete = async (createur) => {
        alert(`La pré-inscription de ${createur.nom} ${createur.prenom} n'est pas validée.`);
        
        try {
            await axios.post('http://localhost:3001/refutationEmailCrea', {
                createur: createur
            });
            console.log("E-mail envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    };
  
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/preinscriCrea");
            setPCreaData(result.data);
        } catch (err) {
            console.log("Quelque chose s'est mal passé lors de la récupération des données créateur:", err);
        }
    };
  
    const handleDeleteClick = (createur) => {
        setSelectedPCreaId(createur.id);
        setPCreaToDelete(createur);
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
    };
  
    const handleCancelDelete = () => {
        setSelectedPCreaId(null);
        setPCreaToDelete(null);
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
    };
  
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/preinscriCrea/${selectedPCreaId}`);
            setShowDeleteConfirmation(false);
            setBlurBackground(false);
            setPCreaToDelete(null);
            fetchData();
        } catch (error) {
            console.error("Erreur lors de la suppression de créateur :", error);
        }
    };
  
    const filteredPCreateurs = searchTerm
        ? PCreaData.filter(
            (createur) =>
            `${createur.nom.toLowerCase()} ${createur.prenom.toLowerCase()}`.includes(searchTerm.toLowerCase())
        )
        : PCreaData;

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
                                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Pré-inscriptions</div>
                                    <div className="h6 mb-0 text-center">{filteredPCreateurs.length}</div>
                                </div>
                                <img src="src/assets/images/creation.png" alt="" style={{ marginLeft: '40px' }} />
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
                </div>
                <div className="card-box mb-30 bigger-card1" style={{ height: '500px' }}>
                    <div className="pd-20">
                        <h4 className="h4">Créateurs</h4>
                    </div>
                    <div className="pb-20" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="table hover multiple-select-row data-table-export nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort text-purple"></th>
                                    <th className="text-purple">Nom</th>
                                    <th className="text-purple">Prénom</th>
                                    <th className="text-purple">Anniversaire</th>
                                    <th className="text-purple">Email</th>
                                    <th className="text-purple">Adresse</th>
                                    <th className="text-purple">Numero</th>
                                    <th className="text-purple">Lien Instagram</th>
                                    <th className="text-purple">Lien Facebook</th>
                                    <th className="text-purple">Lien TikTok</th>
                                    <th className="text-purple">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPCreateurs.map((createur, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{createur.nom.toUpperCase()}</td>
                                        <td>{capitalizeFirstLetter(createur.prenom)}</td>
                                        <td>{createur.anniversaire ? new Date(createur.anniversaire).toLocaleDateString('fr-FR') : '-'}</td>
                                        <td>
                                            <a href={`mailto:${createur.email}`}>
                                                {createur.email}
                                            </a>
                                        </td>
                                        <td>{createur.adresse}</td>
                                        <td>{createur.num}</td>
                                        <td>{createur.lienInsta}</td>
                                        <td>{createur.lienFace}</td>
                                        <td>{createur.lienTik}</td>
                                        <td style={{ display: 'flex', flexDirection: 'row' }}>
                                            <button className="button1" onClick={() => handleValidation(createur)}>
                                                <FontAwesomeIcon icon={faCheck} />
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
                creaToDelete={PCreaToDelete}
                handleDelete={handleDelete}
            />
        </>
    );
}

export default PreInscriptionCrea;
