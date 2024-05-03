const express = require('express');
const router = express.Router();
const { getUserFromDatabase } = require('../Controllers/authController.js');
const bcrypt = require('bcrypt');

// Fonction pour authentifier l'utilisateur
const authenticateUser = async (email, password) => {
    try {
        const user = await getUserFromDatabase(email);

        if (!user) {
            console.log('Utilisateur non trouvé pour l\'e-mail fourni');
            return null;
        }

        console.log('Password from user:', password); // Vérifier le mot de passe saisi par l'utilisateur
        console.log('Password from database:', user.password); // Vérifier le mot de passe récupéré depuis la base de données

        // Comparaison du mot de passe haché
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', passwordMatch); // Vérifier le résultat de la comparaison

        if (passwordMatch) {
            console.log('Utilisateur authentifié avec succès');
            return user;
        } else {
            console.log('Mot de passe incorrect');
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de l'authentification de l'utilisateur :", error);
        throw error;
    }
};


router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (typeof email !== 'string' || email.trim() === '' || typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ error: 'Adresse e-mail ou mot de passe invalide' });
        }

        const user = await authenticateUser(email.trim(), password.trim());

        if (!user) {
            return res.status(401).json({ error: 'Adresse e-mail ou mot de passe incorrect' });
        }

        // Ici, vous pouvez générer un token JWT et le retourner à l'utilisateur pour gérer la session
        // const token = generateToken(user);

        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        return res.status(500).json({ error: "Erreur lors de la connexion : " + error.message });
    }
});

module.exports = router;
