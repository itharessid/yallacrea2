const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db');

// Configuration du stockage des vidéos avec Multer
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

// Endpoint pour télécharger une vidéo pour un créateur spécifique
router.post('/video/:idCreateur', upload.single('video'), (req, res) => {
    const { titre, description } = req.body;
    const videoName = req.file ? req.file.filename : null;
    const date = new Date().toISOString().slice(0, 10);
    const idCreateur = req.params.idCreateur; // Récupérer l'ID du créateur depuis les paramètres de la requête

    const sql = "INSERT INTO video (video, titre, description, date, idCreateur) VALUES (?, ?, ?, ?, ?)";
    const values = [videoName, titre, description, date, idCreateur];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});


// Endpoint pour mettre à jour les données d'une vidéo
router.put('/video/:idVid', upload.single('video'), (req, res) => {
    const idVid = req.params.idVid;
    const { titre, description } = req.body;
    let videoName = null;

    if (req.file) {
        videoName = req.file.filename;
    }

    const date = new Date().toISOString().slice(0, 10);

    const sql = "UPDATE video SET video=?, titre=?, description=?, date=? WHERE idVid=?";
    const values = [videoName, titre, description, date, idVid]; 

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});

// Endpoint pour récupérer les données des vidéos
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

// Endpoint pour récupérer les données d'une vidéo par son ID
router.get('/video/:idVid', (req, res) => {
    const idVid = req.params.idVid;
    const sql = 'SELECT * FROM video WHERE idVid = ?';
    db.query(sql, idVid, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de la vidéo :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de la vidéo" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Vidéo non trouvée" });
        }
        return res.json(result[0]);
    });
});

// Endpoint pour supprimer une vidéo par son ID
router.delete('/video/:idVid', (req, res) => {
    const idVid = req.params.idVid;
    const sql = 'DELETE FROM video WHERE idVid = ?';
    db.query(sql, idVid, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de la vidéo :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de la vidéo" });
        }
        return res.status(200).json({ message: "Vidéo supprimée avec succès" });
    });
});

// Endpoint pour mettre à jour le nombre de likes d'une vidéo
router.put('/video/:idVid/like', (req, res) => {
    const idVid = req.params.idVid;
    const { likes } = req.body;

    const sql = 'UPDATE video SET likes = ? WHERE idVid = ?';
    const values = [likes, idVid];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour du nombre de likes dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour du nombre de likes dans la base de données" });
        }
        return res.status(200).json({ message: "Nombre de likes mis à jour avec succès" });
    });
});

// Endpoint pour récupérer le nombre de likes d'une vidéo par son ID
router.get('/video/:idVid/like', (req, res) => {
    const idVid = req.params.idVid;

    const sql = 'SELECT likes FROM video WHERE idVid = ?';
    
    db.query(sql, idVid, (err, result) => {
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
// Endpoint pour récupérer les vidéos d'un créateur par son ID
router.get('/createur/videos/:idCreateur', (req, res) => {
    const idCreateur = req.params.idCreateur;
    const sql = 'SELECT * FROM video WHERE idCreateur = ?';
    db.query(sql, idCreateur, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des vidéos du créateur :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des vidéos du créateur" });
        }
        return res.status(200).json(results);
    });
});


module.exports = router;
