const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.post('/calendrier', (req, res) => {
  const { titre, date, heureDebut, heureFin } = req.body;
  const sql = "INSERT INTO calendrier (titre, date, heureDebut, heureFin) VALUES (?, ?, ?, ?)";
  const values = [titre, date, heureDebut, heureFin];
  db.query(sql, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});
router.put('/calendrier/:id', (req, res) => {
    const eventId = req.params.id;
    const { title, start, end } = req.body;
    const sql = "UPDATE calendrier SET titre = ?, dateDebut = ?, dateFin = ? WHERE id = ?";
    const values = [title, start, end, eventId];
    db.query(sql, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
  
module.exports = router;
