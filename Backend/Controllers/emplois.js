const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db');

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/temps'); // Utilisez le chemin relatif pour sortir du dossier backend
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = `${file.originalname}_${Date.now()}${ext}`; // Utiliser le nom d'origine du fichier avec une timestamp pour éviter les doublons
        cb(null, fileName);
    }
});


 const upload = multer({ storage: storage });

 router.post('/emploist', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }

    const photoName = req.file.filename;

    const sql = "INSERT INTO emplois (titre, description, emplois, typedecour) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.titre || "",
        req.body.description || "",
        photoName, // Utiliser le nom du fichier seulement
        req.body.typeCours || "",
        req.body.typedecour || ""
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

// Endpoint pour récupérer les données de la table emplois
router.get('/emplois', (req, res) => {
    const sql = "SELECT * FROM emplois";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de la base de données" });
        }
        return res.status(200).json(results);
    });
});
router.get('/emplois/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM emplois WHERE idEmplois = ?'; // Vérifiez le nom de la colonne ici
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données  :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données " });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Emploi non trouvé" }); // Correction du message d'erreur
        }
        return res.json(result[0]);
    });
});
router.put('/emplois/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id;
    const { titre, description, typedecour } = req.body;
    let photoName = null;

    // Vérifier si une nouvelle image a été téléchargée
    if (req.file) {
        photoName = req.file.filename;
    }

    const sql = "UPDATE emplois SET titre=?, description=?, typedecour=?, emplois=? WHERE idEmplois=?";
    const values = [titre, description, typedecour, photoName, id]; // Utilisation de 'idEmplois'

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});
router.delete('/emplois/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM emplois WHERE idEmplois = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'expert :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de l'expert" });
        }
        return res.status(200).json({ message: "Expert supprimé avec succès" });
    });
});

module.exports = router;
