const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.post('/storePasswordInDatabase', async (req, res) => {
    const { studentId, password } = req.body;

    try {
        // Mettre à jour le mot de passe dans la base de données en utilisant une requête préparée
        const updateSql = 'UPDATE etudiants SET password = ? WHERE id = ?';
        db.query(updateSql, [password, studentId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du mot de passe dans la base de données :", err);
                return res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe dans la base de données" });
            }
            return res.status(200).json({ message: "Mot de passe mis à jour avec succès dans la base de données" });
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe dans la base de données :", error);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe dans la base de données" });
    }
});

module.exports = router;
