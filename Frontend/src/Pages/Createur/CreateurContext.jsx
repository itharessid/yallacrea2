import React, { createContext, useContext, useState } from 'react';

// Création du contexte
const CreateurContext = createContext({ selectedCreateurId: null, setSelectedCreateurId: () => {} });

// Hook personnalisé pour utiliser le contexte
export const useCreateurContext = () => useContext(CreateurContext);

// Provider du contexte
export const CreateurProvider = ({ children }) => {
    const [selectedCreateurId, setSelectedCreateurId] = useState(null);

    // Fonction pour mettre à jour l'ID du créateur sélectionné
    const updateSelectedCreateurId = (createurId) => {
        console.log('Updating selectedCreateurId with value:', createurId);
        setSelectedCreateurId(createurId);
    };

    console.log('selectedCreateurId in context:', selectedCreateurId);

    return (
        <CreateurContext.Provider value={{ selectedCreateurId, setSelectedCreateurId: updateSelectedCreateurId }}>
            {children}
        </CreateurContext.Provider>
    );
};
