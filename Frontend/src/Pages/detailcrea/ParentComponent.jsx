// Composant parent
import React from 'react';
import Crea from '../Createur/crea'; // Assurez-vous d'importer le bon chemin vers le composant Crea

function ParentComponent() {
    const navigateToDetail = (createurId) => {
        console.log("Navigating to detail page for createur ID:", createurId);
        // Ajoutez ici la logique de navigation vers la page de détail
    };

    return (
        <div>
            {/* Passez la fonction de navigation en tant que prop */}
            <Crea navigateToDetail={navigateToDetail} />
        </div>
    );
}

export default ParentComponent;
