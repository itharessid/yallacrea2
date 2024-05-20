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
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}_${Date.now()}${ext}`;
        cb(null, fileName);
    }
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Endpoint pour télécharger une image d'createurs
router.post('/createur', upload.single('photo'), (req, res) => {
    const { nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers,description } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }
    
    const photoName = req.file.filename;

    const sql = "INSERT INTO createurs (nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description ,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    const values = [nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description ,photoName];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

// Endpoint pour mettre à jour les données d'un créateur

router.put('/createur/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description } = req.body;
    let photoName = null;

    if (req.file) {
        photoName = req.file.filename;
    }

    const sql = "UPDATE createurs SET nom=?, prenom=?, email=?, adresse=?, num=?, anniversaire=?, lienInsta=?, lienFace=?, lienTik=?, domaine=?, nbFollowers=?, description=?, image=? WHERE idCreateur=?";
    const values = [nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description, photoName, id]; 

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});



// Endpoint pour récupérer les données de l'createurs
router.get('/createur', (req, res) => {
    const sql = 'SELECT * FROM createurs';
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
    
    // Endpoint pour télécharger une image d'createurs
    router.post('/createur', upload.single('avatar'), (req, res) => {
        const { nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier n'a été téléchargé" });
        }
        
        const avatarData = req.file.buffer; // Données binaires du fichier
        
        const sql = "INSERT INTO createurs (nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [nom, prenom, email, adresse, num, anniversaire, lienInsta, lienFace, lienTik, domaine, nbFollowers, description, avatarData];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion dans la base de données :", err);
                return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
            }
            return res.status(200).json({ message: "Données insérées avec succès" });
        });
    });
    

    
    // Endpoint pour récupérer les données de tous les createurs
    router.get('/createur', (req, res) => {
        const sql = 'SELECT * FROM createurs';
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des données de l'createurs :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des données de l'createurs" });
            }
            return res.status(200).json(result);
        });
    });
    
    
    // Endpoint pour récupérer les données d'un createurs spécifique par son ID
    router.get('/createur/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM createurs WHERE id = ?';
        db.query(sql, id, (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération des données de createurs :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des données de createurs" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "createurs non trouvé" });
            }
            return res.status(200).json(result[0]);
        });
    });



    
    module.exports = router;
    
        if (err) return res.json({ error: "Erreur lors de la récupération des données" });
        return res.json(result);
    });
});
router.get('/createur/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM createurs WHERE idCreateur = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données de l'createurs :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données de l'createurs" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "createur non trouvé" });
        }
        return res.json(result[0]);
    });
});
// Endpoint pour supprimer un createurs par son ID
router.delete('/createur/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM createurs WHERE idCreateur = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'createurs :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression de l'createurs" });
        }
        return res.status(200).json({ message: "createur supprimé avec succès" });
    });
});


router.put('/createur/photo/:id', upload.single('photo'), (req, res) => {
    const id = req.params.id;
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }

    const photoName = req.file.filename;

    const sql = "UPDATE createurs SET image=? WHERE idCreateur=?";
    const values = [photoName, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de l'image dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour de l'image dans la base de données" });
        }
        return res.status(200).json({ message: "Image mise à jour avec succès" });
    });
});
module.exports = router;

