const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Middleware pour analyser le corps de la requête JSON
router.use(express.json());

router.get("/domaine", (req, res) => {
    db.query("SELECT * FROM domaines", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des domaines");
      } else {
        res.send(result);
      }
    });
  });

router.post("/domaine", (req, res) => {
    const { nomDomaine } = req.body;
    const sql = "INSERT INTO domaines (nomDomaine) VALUES (?)";
    const values = [nomDomaine];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'insertion de domaine");
        } else {
            res.status(200).send("Nouvel domaine ajouté avec succès");
        }
    });
});
router.delete("/domaine/:id", (req, res) => {
    const idDomaine = req.params.id;
  
    const sql = "DELETE FROM domaines WHERE id = ?";
    db.query(sql, idDomaine, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de domaine :", err);
        res.status(500).send("Erreur lors de la suppression de domaine");
      } else {
        res.status(200).send("Domaine supprimé avec succès");
      }
    });
  });
router.get('/domaine/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM domaines WHERE id = ?';
  db.query(sql, id, (err, result) => {
      if (err) {
          console.error("Erreur lors de la récupération des données de domaine :", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des données de domaine" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "domaine non trouvé" });
      }
      return res.status(200).json(result[0]);
  });
});


  



module.exports = router;
