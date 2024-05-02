const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Ajout d'un événement
router.post('/calendrier', (req, res) => {
  const { titre, date, heureDebut, heureFin } = req.body;
  const sql = "INSERT INTO calendrier (titre, date, heureDebut, heureFin) VALUES (?, ?, ?, ?)";
  const values = [titre, date, heureDebut, heureFin];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de l'ajout de l'événement");
    } else {
      res.status(200).send("L'événement a été ajouté avec succès");
    }
  });
});

// Récupération de tous les événements
router.get('/calendrier', (req, res) => {
  const sql = "SELECT * FROM calendrier";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); // Log de l'erreur SQL pour le débogage
      res.status(500).send("Erreur lors de la récupération des événements");
    } else {
      res.status(200).send(data);
    }
  });
});
router.get('/calendrier/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const sql = 'SELECT * FROM calendrier WHERE id = ?';
  db.query(sql, eventId, (err, result) => {
      if (err) {
          console.error("Erreur lors de la récupération des données :", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des données" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "évènement non trouvé" });
      }
      return res.status(200).json(result[0]);
  });
});


// Suppression d'un événement par ID
router.delete('/calendrier/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const sql = "DELETE FROM calendrier WHERE id = ?";
  db.query(sql, eventId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression de l'événement");
    } else {
      res.status(200).send("L'événement a été supprimé avec succès");
    }
  });
});

// Modification d'un événement par ID
router.put('/calendrier/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const { titre, date, heureDebut, heureFin } = req.body;
  const sql = "UPDATE calendrier SET titre = ?, date = ?, heureDebut = ?, heureFin = ? WHERE id = ?";
  const values = [titre, date, heureDebut, heureFin, eventId];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la mise à jour de l'événement");
    } else {
      res.status(200).send("L'événement a été mis à jour avec succès");
    }
  });
});

module.exports = router;
