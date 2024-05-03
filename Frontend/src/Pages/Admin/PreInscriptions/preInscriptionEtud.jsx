import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import './preInscription.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, etudiantToDelete, handleDelete }) {
  return (
    showDeleteConfirmation && (
      <div className="cardconfirmation-dialog">
        <div className="card-body confirmation-dialog-content">
          <p>Êtes-vous sûr de vouloir supprimer {etudiantToDelete.nom} {etudiantToDelete.prenom} ?</p>
          <div className="confirmation-buttons">
            <button onClick={() => {
              handleDelete(etudiantToDelete); // Appeler handleDelete avec l'étudiant à supprimer
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

function PreInscriptionEtud() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedPEtudiantId, setSelectedPEtudiantId] = useState(null);
  const [PetudiantToDelete, setPEtudiantToDelete] = useState(null); // Nouveau state pour l'étudiant à supprimer
  const [PEtudiantData, setPEtudiantData] = useState([]);
  const [blurBackground, setBlurBackground] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleValidation = async (etudiant) => {
    alert(`La pré-inscription de ${etudiant.nom} ${etudiant.prenom} est validée.`);
    try {
      await axios.post('http://localhost:3001/sendEmailEtud', {
        etudiant: etudiant
      });
      console.log("E-mail envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
  };

  const handleDelete = async (etudiant) => {
    alert(`La pré-inscription de ${etudiant.nom} ${etudiant.prenom} n'est pas validée.`);
    try {
      await axios.post('http://localhost:3001/refutationEmailEtud', {
        etudiant: etudiant,
        sender: 'ons' // ou 'ithar' selon le cas
      });
      console.log("E-mail envoyé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
    }
  };

  const handleValidationClick = async (etudiant) => {
    try {
      const password = generateRandomPassword(); // Générer un mot de passe aléatoire
      await axios.post('http://localhost:3001/sendPasswordEmail', {
        studentEmail: etudiant.email, // Passer l'adresse e-mail de l'étudiant
        password: password, // Passer le mot de passe aléatoire
        sender: 'ons' // ou 'ithar' selon le cas
      });
      // Stocker le mot de passe haché dans la base de données
      await axios.post('http://localhost:3001/storePasswordInDatabase', {
        studentId: etudiant.id, // Passer l'identifiant de l'étudiant
        password: password // Passer le mot de passe aléatoire
    });

      console.log("E-mail envoyé avec succès !");
      alert(`Un e-mail a été envoyé à ${etudiant.nom} ${etudiant.prenom} avec le mot de passe : ${password}`);

      // Déplacer l'étudiant de la table des pré-inscriptions vers la table des étudiants
      await axios.post('http://localhost:3001/moveStudentToStudentsTable', {
        etudiant: etudiant
      });

      // Rafraîchir les données après avoir déplacé l'étudiant
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail ou du déplacement de l'étudiant :", error);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3001/preinscriEtudiant");
      setPEtudiantData(result.data);
    } catch (err) {
      console.log("Quelque chose s'est mal passé lors de la récupération des données étudiant :", err);
    }
  };

  const handleDeleteClick = (etudiant) => {
    setSelectedPEtudiantId(etudiant.id);
    setPEtudiantToDelete(etudiant); // Définir l'étudiant à supprimer
    setShowDeleteConfirmation(true);
    setBlurBackground(true);
  };

  const handleCancelDelete = () => {
    setSelectedPEtudiantId(null);
    setPEtudiantToDelete(null); // Remettre à null l'étudiant à supprimer
    setShowDeleteConfirmation(false);
    setBlurBackground(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/preinscriEtudiant/${selectedPEtudiantId}`);
      setShowDeleteConfirmation(false);
      setBlurBackground(false);
      setPEtudiantToDelete(null); // Remettre à null l'étudiant à supprimer après suppression
      fetchData(); // Mettre à jour les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
    }
  };

  const filteredPEtudiants = searchTerm
    ? PEtudiantData.filter(
      (etudiant) =>
        `${etudiant.nom.toLowerCase()} ${etudiant.prenom.toLowerCase()} ${etudiant.programme.toLowerCase()} ${etudiant.niveau.toLowerCase()}`.includes(searchTerm.toLowerCase())
    )
    : PEtudiantData;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
                  <div className="h6 mb-0 text-center">{filteredPEtudiants.length}</div> {/* Utiliser la longueur de filteredEtudiants */}
                </div>
                <img src="src/assets/images/etudiant.png" alt="" style={{ marginLeft: '40px' }} />
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
        <div className="card-box mb-30 bigger-card1">
          <div className="pd-20">
            <h4 className="h4">Etudiants</h4>
          </div>
          <div className="pb-20">
            <table className="table hover multiple-select-row data-table-export nowrap">
              <thead>
                <tr>
                  <th className="table-plus datatable-nosort text-purple"></th>
                  <th className="text-purple">Nom</th>
                  <th className="text-purple">Prénom</th>
                  <th className="text-purple">Anniversaire</th>
                  <th className="text-purple">Email</th>
                  <th className="text-purple">Adresse</th>
                  <th className="text-purple">num</th>
                  <th className="text-purple">Niveau</th>
                  <th className="text-purple">Programme</th>
                  <th className="text-purple">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPEtudiants.map((etudiant, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{etudiant.nom.toUpperCase()}</td>
                    <td>{capitalizeFirstLetter(etudiant.prenom)}</td>
                    <td>{etudiant.anniversaire ? new Date(etudiant.anniversaire).toLocaleDateString('fr-FR') : '-'}</td>
                    <td>
                      <a href={`mailto:${etudiant.email}`}>
                        {etudiant.email}
                      </a>
                    </td>
                    <td>{etudiant.adresse}</td>
                    <td>{etudiant.num}</td>
                    <td>{etudiant.niveau}</td>
                    <td>{etudiant.programme}</td>
                    <td style={{ display: 'flex', flexDirection: 'row' }}>
                      <button className="button1" onClick={() => handleValidation(etudiant)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button className="button2" onClick={() => handleValidationClick(etudiant)}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
                      <button className="button2" onClick={() => handleDeleteClick(etudiant)}>
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
        etudiantToDelete={PetudiantToDelete} // Passer l'étudiant à supprimer au composant ConfirmationDialog
        handleDelete={handleDelete}
      />
    </>
  );
}

export default PreInscriptionEtud;
