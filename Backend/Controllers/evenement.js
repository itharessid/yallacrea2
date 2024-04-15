const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db');

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Utilisez path.resolve pour obtenir un chemin absolu
        cb(null, '../frontend/public/evenements'); // Utilisez le chemin relatif pour sortir du dossier backend
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}_${Date.now()}${ext}`;
        cb(null, fileName);
    }
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Endpoint pour télécharger une image d'createurs
router.post('/evenements', upload.single('photo'), (req, res) => {
    const { titre, description,lienphotos, lienvideo, dateevent} = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }
    
    const photoName = req.file.filename;

    const sql = "INSERT INTO evenements (titre, description,image,lienphotos, lienvideo, dateevent) VALUES (?,?, ?, ?, ?, ?)";
    const values = [titre, description,photoName,lienphotos, lienvideo, dateevent];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

// Endpoint pour mettre à jour les données d'un créateur

router.put('/evenements/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id;
    const { titre, description, lienphotos, lienvideo, dateevent} = req.body;
    let photoName = null;

    if (req.file) {
        photoName = req.file.filename;
    }

    const sql = "UPDATE evenements SET titre=?, description=?, image=?, lienphotos=?, lienvideo=?, dateevent=? WHERE id=?";
    const values = [titre, description, , photoName,lienphotos, lienvideo, dateevent, id]; 

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});



// Endpoint pour récupérer les données de l'createurs
router.get('/evenements', (req, res) => {
    const sql = 'SELECT * FROM evenements';
    db.query(sql, (err, result) => {const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const path = require('path');
    const db = require('../Config/db');
    

    
    // Initialisation de Multer avec la configuration de stockage
    const upload = multer({ storage: storage });
    
    // Endpoint pour télécharger une image d'createurs
   
    

    
    // Endpoint pour récupérer les données de tous les createurs
    router.get('/evenements', (req, res) => {
        const sql = 'SELECT * FROM evenements';
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des données de l'évènement :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des données de l'évènement" });
            }
            return res.status(200).json(result);
        });
    });
    
    
    // Endpoint pour récupérer les données d'un createurs spécifique par son ID
    router.get('/evenements/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM evenements WHERE id = ?';
        db.query(sql, id, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des données de l'évènement :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des données de l'évènement" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "évènement non trouvé" });
            }
            return res.status(200).json(result[0]);
        });
    });



    
    module.exports = router;
    
        if (err) return res.json({ error: "Erreur lors de la récupération des données" });
        return res.json(result);
    });
});
router.get('/evenements/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM evenements WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de l'évènement :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de l'évènement" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "évènement non trouvé" });
        }
        return res.json(result[0]);
    });
});
// Endpoint pour supprimer un createurs par son ID
router.delete('/evenements/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM evenements WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'évènement :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de l'évènement" });
        }
        return res.status(200).json({ message: "évènement supprimé avec succès" });
    });
});


module.exports = router;

