import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './preInscription.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, createurToDelete, handleDelete }) {
    return (
        showDeleteConfirmation && createurToDelete && (
            <div className="cardconfirmation-dialog">
                <div className="card-body confirmation-dialog-content">
                    <p>Êtes-vous sûr de vouloir supprimer {createurToDelete.nom} {createurToDelete.prenom} ?</p>
                    <div className="confirmation-buttons">
                        <button onClick={() => {
                            handleDelete(createurToDelete); // Appeler handleDelete avec l'étudiant à supprimer
                            handleConfirmDelete()
                        }}
                            className="confirm-button">
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

function PreInscriptionCrea() {
    const [createurData, setCreateurData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPCreateurId, setSelectedPCreateurId] = useState(null);
    const [PCreateurToDelete, setPCreateurToDelete] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/preinscriCrea");
            setCreateurData(result.data);
        } catch (err) {
            console.log("Quelque chose s'est mal passé lors de la récupération des données créateur:", err);
        }
    };

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

    const handleValidationClick = async (createur) => {
        try {
            const password = generateRandomPassword(); // Générer un mot de passe aléatoire
            await axios.post('http://localhost:3001/sendPasswordEmailCrea', {
                creaEmail: createur.email, // Passer l'adresse e-mail du créateur
                password: password, // Passer le mot de passe aléatoire
                sender: 'ithar' // ou 'ons' selon le cas
            });
            console.log("E-mail envoyé avec succès !");
            alert(`Un e-mail a été envoyé à ${createur.nom} ${createur.prenom} avec le mot de passe : ${password}`);
  
            // Déplacer uniquement le créateur sur lequel le bouton d'enveloppe a été cliqué
            await axios.post('http://localhost:3001/transferPreinscriToCreateur', {
                createur: createur
            });
  
            // Rafraîchir les données après avoir déplacé le créateur
            fetchData();
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail ou du déplacement du créateur :", error);
        }
    };

    const generateRandomPassword = () => {
        const length = 8; // Longueur du mot de passe
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Caractères possibles
        let password = "";
        for (let i = 0; i < length; ++i) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const filteredCreateurs = searchTerm
        ? createurData.filter(
              (createur) =>
                  `${createur.nom.toLowerCase()} ${createur.prenom.toLowerCase()}`.includes(searchTerm.toLowerCase())
          )
        : createurData;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleDeleteClick = (createur) => {
        setSelectedPCreateurId(createur.id);
        setPCreateurToDelete(createur); 
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/preinscriCrea/${selectedPCreateurId}`);
            setShowDeleteConfirmation(false);
            setBlurBackground(false);
            setPCreateurToDelete(null); // Remettre à null le créateur à supprimer après suppression
            fetchData(); // Mettre à jour les données après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression du créateur :", error);
        }
    };

    const handleCancelDelete = () => {
        setSelectedPCreateurId(null);
        setPCreateurToDelete(null); // Remettre à null le créateur à supprimer
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
    };

    const handleDelete = async (createur) => {
        alert(`La pré-inscription de ${createur.nom} ${createur.prenom} n'est pas validée.`);
        try {
            await axios.post('http://localhost:3001/refutationEmailCrea', {
                createur: createur,
                sender: 'ons' // ou 'ithar' selon le cas
            });
            console.log("E-mail envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
        }
    };

    return (
        <>
            <Adminsidbar />
            <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
                <div className="row">
                    <div className="col-xl-3 mb-20">
                        <div className="card-box-Etud height-100-p widget-style1">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="widget-data">
                                    <div className="weight-600 font-14 text-purple text-center text-nowrap">Pré-inscriptions</div>
                                    <div className="h6 mb-0 text-center">{filteredCreateurs.length}</div>
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
                        placeholder="Trouver un créateur"
                        aria-controls="DataTables_Table_2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    /></label>
                </div>
                <div className="card-box mb-30 bigger-card1" style={{ height: '500px' }}>
                    <div className="pd-20">
                        <h4 className="h4">Les pré-inscriptions des créateurs</h4>
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
                                {filteredCreateurs.map((createur, index) => (
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
                                            <button className="button2" onClick={() => handleValidationClick(createur)}>
                                                <FontAwesomeIcon icon={faEnvelope} />
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
                createurToDelete={PCreateurToDelete} // Passer le créateur à supprimer au composant ConfirmationDialog
                handleDelete={handleDelete}
            />
        </>
    );
}

export default PreInscriptionCrea;

