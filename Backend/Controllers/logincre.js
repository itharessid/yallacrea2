const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.post('/login', (req, res) => {
    const { email } = req.body;

    const sql = 'SELECT idCreateur FROM createurs WHERE email = ?';
    db.query(sql, email, (err, result) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'email dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la vérification de l'email dans la base de données" });
        }

        if (result.length > 0) {
            const userId = result[0].idCreateur;
            return res.status(200).json({ exists: true, userId: userId });
        } else {
            return res.status(404).json({ exists: false });
        }
    });
});

module.exports = router;
