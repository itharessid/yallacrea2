// Importez express et créez votre routeur
const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Définissez votre route POST pour ajouter un événement
router.post('/calendrier', (req, res) => {
  const { titre, date, heureDebut, heureFin } = req.body;
  const sql = "INSERT INTO calendrier (titre, date, heureDebut, heureFin) VALUES (?, ?, ?, ?)";
  const values = [titre, date, heureDebut, heureFin];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

// Définissez votre route PUT pour mettre à jour un événement existant

// Définissez votre route GET pour récupérer tous les événements (optionnel, à adapter selon vos besoins)
router.get('/calendrier', (req, res) => {
  const sql = "SELECT * FROM calendrier";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

module.exports = router;
