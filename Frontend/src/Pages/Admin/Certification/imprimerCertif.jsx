import React, { useEffect } from 'react';

function ImpCertif() {
    useEffect(() => {
        // Exemple de récupération de données (peut être remplacé par une requête AJAX ou autre)
        const fetchData = async () => {
            // Simulons une requête pour obtenir des données
            const response = await fetch('URL_DE_VOTRE_API_OU_ENDPOINT');
            const result = await response.json();
            // setData(result); // Met à jour l'état avec les données récupérées
            console.log(result); // Remplacer par votre logique de mise à jour de l'état
        };

        fetchData(); // Appel de la fonction pour récupérer les données
    }, []);

    return (
        <div className="printable-area" style={{ position: 'relative' }}>
            <img src="src/Pages/Admin/Certification/certifications/certificat.png" alt="Description de l'image" style={{ width: "75%", marginLeft: "10px" }} />
            <div style={{ position: "absolute", top: "150px", left: "200px" }}>
                <p style={{ fontSize: '25px', color: 'black' }}><strong></strong></p>
            </div>
            <div style={{ position: "absolute", top: "215px", left: "225px" }}>
                <p style={{ fontSize: '11px', color: 'black' }}><strong>aaaaaaaaaaaaaaaaaaaaaaaa</strong></p>
            </div>
            <div style={{ position: "absolute", top: "280px", left: "105px" }}>
                <p style={{ fontSize: '10px', color: 'black' }}><strong>Nom: ons</strong></p>
            </div>
            <div style={{ position: "absolute", top: "280px", left: "365px" }}>
                <p style={{ fontSize: '10px', color: 'black' }}><strong>RIAHI Fayez</strong></p>
            </div>
        </div>
    );
}

export default ImpCertif;
