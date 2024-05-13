import React, { useState } from 'react';
import './obmdp.css'; // Assurez-vous d'importer votre feuille de style CSS

function OublierMdp() {
    const [email, setEmail] = useState(''); // State pour stocker l'adresse e-mail
    const [message, setMessage] = useState(''); // State pour stocker le message de confirmation

    // Fonction pour gérer le changement de l'adresse e-mail
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, sender: 'ons' }), // Ajoutez le paramètre sender
            });

            if (response.ok) {
                const data = await response.text(); // Modifier ici pour obtenir le texte brut
                setMessage(data); // Modifier ici pour définir le message
            } else {
                setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
            }
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div className="password-reset-center">
            <div className="password-reset-container">
                <h2 className="title">Mot de passe oublié ?</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Adresse e-mail :</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control custom-input" // Ajout de la classe "custom-input"
                            placeholder="Entrez votre adresse e-mail"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btns btns-primary">Réinitialiser le mot de passe</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default OublierMdp;
