const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Contrôleur pour mettre à jour ou ajouter une description pour une personne sans spécifier son ID
router.post('/des', (req, res) => {
    const { nom, description } = req.body;

    // Vérifie si le nom et la description sont fournis
    if (!nom || !description) {
        return res.status(400).send("Le nom et la description sont requis");
    }

    db.query(
        "UPDATE createur SET description = ? WHERE nom = ?",
        [description, nom],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Erreur lors de la mise à jour de la description dans la base de données");
            }
            if (result.affectedRows === 0) {
                // Si aucune ligne n'a été affectée, cela signifie que le nom n'existe pas encore dans la base de données, alors nous l'insérons
                db.query(
                    "INSERT INTO createur (nom, description) VALUES (?, ?)",
                    [nom, description],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send("Erreur lors de l'insertion de la description dans la base de données");
                        }
                        console.log("Description ajoutée avec succès");
                        return res.status(200).send("Description ajoutée avec succès");
                    }
                );
            } else {
                console.log("Description mise à jour avec succès");
                return res.status(200).send("Description mise à jour avec succès");
            }
        }
    );
});

module.exports = router;
