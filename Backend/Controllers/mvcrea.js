const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.use(express.json());

// Endpoint pour transférer les pré-inscriptions des créateurs vers la table createurs
// Endpoint pour transférer une pré-inscription de créateur vers la table createurs
router.post("/transferPreinscriToCreateur", (req, res) => {
    const createur = req.body.createur; // Obtenir le créateur à transférer depuis la requête

    const { id, nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace, lienTik, domaine } = createur;
    const sql = "INSERT INTO createurs (nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace, lienTik, domaine) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace, lienTik, domaine];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion des données dans la table createurs :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion des données dans la table createurs" });
        }

        // Si l'insertion dans la table createurs est réussie, supprimer la pré-inscription de la table preinscricrea
        db.query("DELETE FROM preinscricrea WHERE id = ?", [id], (err, deleteResult) => {
            if (err) {
                console.error("Erreur lors de la suppression de la pré-inscription du créateur :", err);
                return res.status(500).json({ error: "Erreur lors de la suppression de la pré-inscription du créateur" });
            }
            return res.status(200).json({ message: "Transfert de la pré-inscription du créateur effectué avec succès" });
        });
    });
})

module.exports = router;
