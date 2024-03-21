const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.post('/calendrier', (req, res) => {
  const { titre, date, heureDebut, heureFin } = req.body;
  const sql = "INSERT INTO calendrier (titre, date, heureDebut, heureFin) VALUES (?, ?, ?, ?)";
  const values = [titre, date, heureDebut, heureFin];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
    }else{res.send("un nouveau affaire est ajouté")}
  });
});

router.get('/calendrier', (req, res) => {
  const sql = "SELECT * FROM calendrier";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }else{res.send(data)}
  });
});
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
  
module.exports = router;
