import React, { useState, useEffect } from 'react';
import Adminsidbar from '../Sidbar/Adminsidbar';
import { Link } from 'react-router-dom';

function Diplome() {
    const [data, setData] = useState({}); // Définition de l'état pour les données

    // Utilisation de useEffect pour récupérer les données (simulées ici)
    useEffect(() => {
        // Exemple de récupération de données (peut être remplacé par une requête AJAX ou autre)
        const fetchData = async () => {
            // Simulons une requête pour obtenir des données
            const response = await fetch('URL_DE_VOTRE_API_OU_ENDPOINT');
            const result = await response.json();
            setData(result); // Met à jour l'état avec les données récupérées
        };

        fetchData(); // Appel de la fonction pour récupérer les données
    }, []);

    // Fonction pour gérer l'impression
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
            <Adminsidbar className="noprint" />
            <div className="main-container">
                <div className="row">
                    <button className="button1 noprint" style={{ marginRight: '10px' }}>
                        <Link to="/ndiplome" className="dropdown-toggle">
                            <span className="mtext">Nouveau</span>
                        </Link>
                    </button>

                    <div className="printable-area" style={{ position: 'relative' }}>
                        <img src="src/Pages/Admin/Certification/certifications/diplome.png" alt="Description de l'image" style={{ width: "75%", marginLeft: "10px" }} />
                        {/* Superposition des données sur l'image */}
                        <div style={{ position: "absolute", top: "150px", left: "200px" }}>
                            <p style={{ fontSize: '25px', color: 'black' }}><strong>ESSID ITHAR</strong></p>
                        </div>
                        <div style={{ position: "absolute", top: "235px", left: "225px" }}>
                            <p style={{ fontSize: '11px', color: 'black' }}><strong>Phothhhhhhhhhhhhhhhhhh</strong></p>
                        </div>
                        <div style={{ position: "absolute", top: "280px", left: "105px" }}>
                            <p style={{ fontSize: '10px', color: 'black' }}><strong>Nom: ons</strong></p>
                        </div>
                    </div>

                    {/* Bouton d'impression */}
                    <button className="noprint" onClick={handlePrint}>Imprimer</button>
                </div>
            </div>
        </div>
    )
}

export default Diplome;
