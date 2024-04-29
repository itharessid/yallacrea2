import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConfirmationDialog({ showDeleteConfirmation, handleConfirmDelete, handleCancelDelete, certifToDelete }) {
    return (
      showDeleteConfirmation && (
        <div className="cardconfirmation-dialog">
          <div className="card-body confirmation-dialog-content">
            <p>Êtes-vous sûr de vouloir supprimer la certification du {certifToDelete.nom} {certifToDelete.prenom} ?</p>
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

function Certif() {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedCertifId, setSelectedCertifId] = useState(null);
    const [certifToDelete, setCertifToDelete] = useState(null);
    const [CertifData, setCertifData] = useState([]);
    const [blurBackground, setBlurBackground] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3001/certif");
            setCertifData(result.data);
        } catch (err) {
            console.log("Quelque chose s'est mal passé lors de la récupération des données :", err);
        }
    };

    const handleDeleteClick = (certif) => {
        setSelectedCertifId(certif.idCertif);
        setCertifToDelete(certif);
        setShowDeleteConfirmation(true);
        setBlurBackground(true);
    };

    const handleCancelDelete = () => {
        setSelectedCertifId(null);
        setCertifToDelete(null);
        setShowDeleteConfirmation(false);
        setBlurBackground(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/certif/${selectedCertifId}`);
            setShowDeleteConfirmation(false);
            setBlurBackground(false);
            setCertifToDelete(null);
            fetchData();
        } catch (error) {
            console.error("Erreur lors de la suppression de certif :", error);
        }
    };

    const filteredCertif = searchTerm
        ? CertifData.filter(
            (certif) =>
                `${certif.titre.toLowerCase()}`.includes(searchTerm.toLowerCase())
        )
        : CertifData;

    const handlePrint = () => {
        const printableArea = document.querySelector('.printable-area');
        const htmlContent = printableArea.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Imprimer</title><link rel="stylesheet" type="text/css" href="impression.css"></head><body>');
        printWindow.document.write(htmlContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
        };
    };

    return (
        <div>
            <Adminsidbar/>
            <div className={`main-container ${blurBackground ? 'blur-background' : ''}`}>
            <div className="row">
                <div className="col-xl-3 mb-20">
                    <div className="card-box-Etud height-100-p widget-style1">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="widget-data">
                        <div className="weight-600 font-14 text-purple text-center text-nowrap">Certifications</div>
                        <div className="h6 mb-0 text-center">{filteredCertif.length}</div> {/* Utiliser la longueur de filteredEtudiants */}
                        </div>
                        <img src="src/assets/images/certif.png" alt="" style={{ marginLeft: '40px' }} />
                    </div>
                    </div>
                </div>
            </div>
                <button className="button1 noprint" style={{ marginRight: '10px' }}>
                    <Link to="/ncertif" className="dropdown-toggle">
                        <span className="mtext">Nouveau</span>
                    </Link>
                </button>
                <div className="row">
                    <div className="card-box mb-30 bigger-card1">
                        <div className="pd-20">
                            <h4 className="h4">Certifications</h4>
                        </div>
                        <div className="pb-20">
                            <table className="table hover multiple-select-row data-table-export nowrap">
                                <thead>
                                    <tr>
                                        <th className="table-plus datatable-nosort text-purple"></th>
                                        <th className="text-purple">Nom</th>
                                        <th className="text-purple">Prénom</th>
                                        <th className="text-purple">Titre</th>
                                        <th className="text-purple">Date</th>
                                        <th className="text-purple">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCertif.map((certif, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{certif.nom}</td>
                                            <td>{certif.prenom}</td>
                                            <td>{certif.formation}</td>
                                            <td>{certif.date ? new Date(certif.date).toLocaleDateString('fr-FR') : '-'}</td>
                                            <td style={{ display: 'flex', flexDirection: 'row' }}>
                                                <button className="button1" style={{ marginRight: '10px' }}>
                                                    <Link to={`/imprimerCertif/${certif.idCertif}`} className="dropdown-toggle">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>
                                                </button>
                                                <button className="button2" onClick={() => handleDeleteClick(certif)}>
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
                <button className="noprint" onClick={handlePrint}>Imprimer</button>
            </div>
            <ConfirmationDialog
                    showDeleteConfirmation={showDeleteConfirmation}
                    handleConfirmDelete={handleConfirmDelete}
                    handleCancelDelete={handleCancelDelete}
                    certifToDelete={certifToDelete}
            />
        </div>
    )
}

export default Certif;

