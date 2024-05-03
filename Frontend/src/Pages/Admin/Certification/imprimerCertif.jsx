import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ImpCertif() {
    const { idCertif } = useParams();
    const [certifData, setCertifData] = useState(null);

    useEffect(() => {
        const fetchCertifData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/certif/${idCertif}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setCertifData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du certificat:', error);
            }
        };
        fetchCertifData();
    }, [idCertif]);

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

    if (!certifData) {
        return <div>Loading...</div>;
    }

    const { nom, prenom, formation, date, directeur,type } = certifData;

    return (
        <div>
            <div className="printable-area" style={{ position: 'relative' }}>
                {/*Image avec la taille correspondant à la feuille d'impression*/}
                {/*<img
                src={`http://localhost:3001/certifications/exp.png`}
                alt="Certificat"
                style={{
                    width: "100%", // La largeur est réglée à 100% pour s'adapter à la largeur de la page
                    height: "auto", // La hauteur est ajustée automatiquement pour conserver les proportions de l'image
                    marginLeft: "10px",
                    marginTop: "10px"
                }}
                />*/}
                <img src={`http://localhost:3001/certifications/exp.png`} alt="Certificat" style={{ width: "50%", marginLeft: "10px",marginTop:"10px" }} />
                <div style={{ position: "absolute", top: "65px", left: "220px", fontFamily: "Adobe Garamond Pro", textTransform: "uppercase"}}>
                    <p style={{ fontSize: '25px', color: '#690e68' }}><strong>{type}</strong></p>
                </div>
                <div style={{ position: "absolute", top: "150px", left: "225px" }}>
                    <p style={{ fontSize: '25px', color: 'black' }}><strong>{nom.toUpperCase()} {prenom.charAt(0).toUpperCase() + prenom.slice(1)}</strong></p>
                </div>
                <div style={{ position: "absolute", top: "240px", left: "270px" }}>
                    <p style={{ fontSize: '11px',color:'#4F0041' }}><strong>{formation.toUpperCase()}</strong></p>
                </div>
                <div style={{ position: "absolute", top: "295px", left: "100px" }}>
                    <p style={{ fontSize: '10px', color: 'black' }}><strong>{date? new Date(date).toLocaleDateString('fr-FR') : '-'}</strong></p>
                </div>
                <div style={{ position: "absolute", top: "295px", left: "380px" }}>
                    <p style={{ fontSize: '10px', color: 'black' }}><strong>{directeur.toUpperCase()}</strong></p>
                </div>
            </div>
            <button className="noprint" onClick={handlePrint}>Imprimer</button>
        </div>
    );
}

export default ImpCertif;
