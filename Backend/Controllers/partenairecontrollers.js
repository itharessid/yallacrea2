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
router.post('/partenaire', upload.single('photo'), (req, res) => {
    console.log("Requête reçue :", req.body); // Débogage : Afficher les données du formulaire
    console.log("Fichier reçu :", req.file); // Débogage : Afficher les détails du fichier téléchargé

    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }

    // Récupérer seulement le nom du fichier sans le chemin complet
    const logoName = req.file.filename;

    const sql = "INSERT INTO partenaire (nomSociete, numero, email, logo) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.nomSociete || "",
        req.body.numero || "",
        req.body.email || "",
        logoName // Utiliser le nom du fichier seulement
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        console.log("Données insérées avec succès :", result); // Débogage : Afficher le résultat de l'insertion
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});
   router.get('/partenaireget', (req, res) => {
    const sql = 'SELECT * FROM partenaire';
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données" });
        }
        return res.status(200).json(result);
    });
});
// Endpoint pour récupérer les données d'un partenaire spécifique par ID
router.get('/partenaire/:id', (req, res) => {
    const partenaireId = req.params.id; // Récupérez l'ID du partenaire à partir des paramètres de requête

    const sql = 'SELECT * FROM partenaire WHERE id = ?'; // Requête SQL pour récupérer les données du partenaire par ID
    db.query(sql, [partenaireId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données du partenaire :", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données du partenaire" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Partenaire non trouvé" }); // Si aucun partenaire correspondant n'est trouvé, renvoyez une erreur 404
        }

        const partenaireData = result[0]; // Récupérez les données du premier (et unique) partenaire trouvé
        return res.status(200).json(partenaireData); // Renvoyez les données du partenaire en tant que réponse JSON
    });
});
// Endpoint pour mettre à jour les données d'un partenaire spécifique par ID
router.put('/partenaire/:id', upload.single('photo'), (req, res) => {
    const partenaireId = req.params.id; // Récupérez l'ID du partenaire à partir des paramètres de requête

    // Récupérez les données du formulaire envoyées dans la requête PUT
    const { nomSociete, numero, email, poste } = req.body;

    // Vérifiez si une nouvelle image a été téléchargée et mettez à jour le nom de fichier
    const updatedLogo = req.file ? req.file.filename : '';

    // Construisez la requête SQL en fonction des données fournies dans la requête
    let sql = 'UPDATE partenaire SET';
    const updates = [];

    if (nomSociete) updates.push('nomSociete = ?');
    if (numero) updates.push('numero = ?');
    if (email) updates.push('email = ?');
    if (poste) updates.push('poste = ?');
    if (updatedLogo) updates.push('logo = ?');

    // Ajoutez les valeurs à mettre à jour dans le tableau des valeurs
    const values = [nomSociete, numero, email, poste, updatedLogo].filter(value => value !== undefined);

    // Ajoutez les mises à jour à la requête SQL
    sql += ' ' + updates.join(', ');

    // Ajoutez la clause WHERE pour filtrer par ID du partenaire
    sql += ' WHERE id = ?';
    values.push(partenaireId);

    // Exécutez la requête SQL avec les valeurs fournies
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données du partenaire :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données du partenaire" });
        }

        // Vérifiez si aucune ligne n'a été affectée, ce qui signifie que l'ID du partenaire n'existe pas
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Partenaire non trouvé" });
        }

        // Si la mise à jour est réussie, renvoyez un message de succès
        return res.status(200).json({ message: "Données du partenaire mises à jour avec succès" });
    });
});
// Endpoint pour supprimer les données d'un partenaire spécifique par ID
router.delete('/partenaire/:id', (req, res) => {
    const partenaireId = req.params.id; // Récupérez l'ID du partenaire à partir des paramètres de requête

    // Requête SQL pour supprimer les données du partenaire par ID
    const sql = 'DELETE FROM partenaire WHERE id = ?';

    // Exécutez la requête SQL avec l'ID du partenaire à supprimer
    db.query(sql, [partenaireId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression des données du partenaire :", err);
            return res.status(500).json({ error: "Erreur lors de la suppression des données du partenaire" });
        }

        // Vérifiez si aucune ligne n'a été affectée, ce qui signifie que l'ID du partenaire n'existe pas
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Partenaire non trouvé" });
        }

        // Si la suppression est réussie, renvoyez un message de succès
        return res.status(200).json({ message: "Données du partenaire supprimées avec succès" });
    });
});

module.exports = router;


module.exports = router;
