const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db');

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
        // Utilisez path.resolve pour obtenir un chemin absolu
        cb(null, '../frontend/public/photo'); // Utilisez le chemin relatif pour sortir du dossier backend
     },
     filename: function (req, file, cb) {
        // Modifier la logique pour enregistrer seulement le nom de fichier sans l'extension
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}_${Date.now()}${ext}`;
        cb(null, fileName);
     }
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Endpoint pour télécharger une image d'expert
router.post('/expert', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }

    // Récupérer seulement le nom du fichier sans le chemin complet
    const photoName = req.file.filename;

    const sql = "INSERT INTO experts (nom, prenom, Email, telef, poste, photo) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.nom || "",
        req.body.prenom || "",
        req.body.Email || "",
        req.body.telef || "",
        req.body.poste || "", // Ajout du champ poste

        photoName // Utiliser le nom du fichier seulement
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

// Endpoint pour mettre à jour les données de l'expert
router.put('/expert/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id;
    const { nom, prenom, Email, telef, poste } = req.body; // Modification pour inclure le champ poste
    let photoName = null;

    // Vérifier si une nouvelle image a été téléchargée
    if (req.file) {
        photoName = req.file.filename;
    }

    const sql = "UPDATE experts SET nom=?, prenom=?, Email=?, telef=?, poste=?, photo=? WHERE id=?";
    const values = [nom, prenom, Email, telef, poste, photoName, id]; // Ajout du champ poste

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});

// Endpoint pour récupérer les données de l'expert
router.get('/experget', (req, res) => {
    const sql = 'SELECT * FROM experts';
    db.query(sql, (err, result) => {const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const path = require('path');
    const db = require('../Config/db');
    
    // Configuration du stockage des images avec Multer
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '../frontend/public/photo')); // Utiliser path.resolve pour obtenir un chemin absolu
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${file.fieldname}_${Date.now()}${ext}`;
            cb(null, fileName);
        }
    });
    
    // Initialisation de Multer avec la configuration de stockage
    const upload = multer({ storage: storage });
    
    // Endpoint pour télécharger une image d'expert
    router.post('/expert', upload.single('photo'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
        }
    
        const photoName = req.file.filename;
    
        const sql = "INSERT INTO experts (nom, prenom, Email, telef, photo) VALUES (?, ?, ?, ?, ?)";
        const values = [
            req.body.nom || "",
            req.body.prenom || "",
            req.body.Email || "",
            req.body.telef || "",
            photoName
        ];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion dans la base de données :", err);
                return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
            }
            return res.status(200).json({ message: "Données insérées avec succès" });
        });
    });
    
    // Endpoint pour mettre à jour les données de l'expert
    router.put('/expert/:id', upload.single('photo'), (req, res) => {
        const id = req.params.id;
        const { nom, prenom, Email, telef } = req.body;
        let photoName = null;
    
        if (req.file) {
            photoName = req.file.filename;
        }
    
        const sql = "UPDATE experts SET nom=?, prenom=?, Email=?, telef=?, photo=? WHERE id=?";
        const values = [nom, prenom, Email, telef, photoName, id];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
                return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
            }
            return res.status(200).json({ message: "Données mises à jour avec succès" });
        });
    });
    
    // Endpoint pour récupérer les données de tous les experts
    router.get('/experget', (req, res) => {
        const sql = 'SELECT * FROM experts';
        db.query(sql, (err, result) => {
            if (err) return res.status(500).json({ error: "Erreur lors de la récupération des données" });
            return res.status(200).json(result);
        });
    });
    
    // Endpoint pour récupérer les données d'un expert spécifique par son ID
    router.get('/expert/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM experts WHERE id = ?';
        db.query(sql, id, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des données de l'expert :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des données de l'expert" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Expert non trouvé" });
            }
            return res.status(200).json(result[0]);
        });
    });
    
    module.exports = router;
    
        if (err) return res.json({ error: "Erreur lors de la récupération des données" });
        return res.json(result);
    });
});
router.get('/expert/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM experts WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de l'expert :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de l'expert" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Expert non trouvé" });
        }
        return res.json(result[0]);
    });
});
// Endpoint pour supprimer un expert par son ID
router.delete('/experget/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM experts WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'expert :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de l'expert" });
        }
        return res.status(200).json({ message: "Expert supprimé avec succès" });
    });
});


module.exports = router;


module.exports = router;
