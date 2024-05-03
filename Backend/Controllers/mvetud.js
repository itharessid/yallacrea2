const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.post('/moveStudentToStudentsTable', async (req, res) => {
    const etudiant = req.body.etudiant;

    // Supprimer l'étudiant de la table des pré-inscriptions
    const deleteSql = 'DELETE FROM preinscrietud WHERE id = ?';
    db.query(deleteSql, etudiant.id, async (err, deleteResult) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'étudiant de la table des pré-inscriptions :", err);
            return res.status(500).send("Erreur lors de la suppression de l'étudiant de la table des pré-inscriptions");
        }

        try {
            // Générer un mot de passe aléatoire
            const password = generateRandomPassword();

            // Ajouter l'étudiant à la table des étudiants avec le mot de passe en clair
            const insertSql = 'INSERT INTO etudiants (nom, prenom, adresse, anniversaire, num, email, niveau, programme, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [etudiant.nom, etudiant.prenom, etudiant.adresse, etudiant.anniversaire, etudiant.num, etudiant.email, etudiant.niveau, etudiant.programme, password];
            db.query(insertSql, values, (err, insertResult) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'étudiant dans la table des étudiants :", err);
                    return res.status(500).send("Erreur lors de l'insertion de l'étudiant dans la table des étudiants");
                }
                res.status(200).send("Étudiant déplacé avec succès vers la table des étudiants");
            });
        } catch (error) {
            console.error("Erreur lors de la génération du mot de passe aléatoire :", error);
            return res.status(500).json({ error: "Erreur lors de la génération du mot de passe aléatoire" });
        }
    });
});

// Fonction pour générer un mot de passe aléatoire
const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

module.exports = router;
