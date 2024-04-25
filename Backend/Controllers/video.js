const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db');

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Utilisez path.resolve pour obtenir un chemin absolu
        cb(null, '../frontend/public/videos'); // Utilisez le chemin relatif pour sortir du dossier backend
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}_${Date.now()}${ext}`;
        cb(null, fileName);
    }
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Endpoint pour télécharger une image d'videos
// Endpoint pour télécharger une vidéo
router.post('/video', upload.single('video'), (req, res) => {
    const { titre, description } = req.body;
    const videoName = req.file ? req.file.filename : null;
    const date = new Date().toISOString().slice(0, 10); // Génération automatique de la date

    const sql = "INSERT INTO video (video, titre, description, date) VALUES (?, ?, ?, ?)";
    const values = [videoName, titre, description, date];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

// Endpoint pour mettre à jour les données d'une vidéo
router.put('/video/:id', upload.single('video'), (req, res) => {
    const id = req.params.id;
    const { titre, description } = req.body;
    let videoName = null;

    if (req.file) {
        videoName = req.file.filename;
    }

    const date = new Date().toISOString().slice(0, 10); // Génération automatique de la date

    const sql = "UPDATE video SET video=?, titre=?, description=?, date=? WHERE idVid=?";
    const values = [videoName, titre, description, date, id]; 

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});


// Endpoint pour récupérer les données de l'videos
router.get('/video', (req, res) => {
    const sql = "SELECT * FROM video";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de la base de données" });
        }
        return res.status(200).json(results);
    });
});
router.get('/video/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM video WHERE idVid = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de l'videos :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de l'videos" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "video non trouvé" });
        }
        return res.json(result[0]);
    });
});
// Endpoint pour supprimer un videos par son ID
router.delete('/video/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM video WHERE idVid = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'videos :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de l'videos" });
        }
        return res.status(200).json({ message: "video supprimé avec succès" });
    });
});
router.put('/video/:id/like', (req, res) => {
    const id = req.params.id;
    const { likes } = req.body;

    const sql = 'UPDATE video SET likes = ? WHERE idVid = ?';
    const values = [likes, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour du nombre de likes dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour du nombre de likes dans la base de données" });
        }
        return res.status(200).json({ message: "Nombre de likes mis à jour avec succès" });
    });
});
router.get('/video/:id/like', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT likes FROM video WHERE idVid = ?';
    
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération du nombre de likes depuis la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération du nombre de likes depuis la base de données" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Vidéo non trouvée dans la base de données" });
        }

        const likes = result[0].likes;
        return res.status(200).json({ likes: likes });
    });
});


module.exports = router;

