const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Middleware pour analyser le corps de la requête JSON
router.use(express.json());

router.get("/etudiant", (req, res) => {
    db.query("SELECT * FROM etudiants", (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });
});

router.post("/etudiant", (req, res) => {
    const { nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo } = req.body;
    const sql = "INSERT INTO etudiants (nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'insertion de l'étudiant");
        } else {
            res.status(200).send("Nouvel étudiant ajouté avec succès");
        }
    });
});


module.exports = router;
