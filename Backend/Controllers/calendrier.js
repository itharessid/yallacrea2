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
    }else{res.send("les informations bien enregistrés")}
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

  
module.exports = router;
