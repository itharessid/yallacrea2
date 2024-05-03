// authController.js

const express = require('express');
const router = express.Router();
const { getUserFromDatabase } = require('../Controllers/authController.js');

router.post('/api/login', async (req, res) => {
    const { email } = req.body;

    try {
        if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ error: "Adresse e-mail invalide" });
        }

        const user = await getUserFromDatabase(email.trim());

        if (!user) {
            return res.status(401).json({ error: "Adresse e-mail incorrecte" });
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
