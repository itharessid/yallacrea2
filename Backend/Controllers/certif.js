const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Middleware pour analyser le corps de la requête JSON
router.use(express.json());

router.get("/certif", (req, res) => {
    db.query("SELECT * FROM certif", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des certif");
      } else {
        res.send(result);
      }
    });
  });

router.post("/certif", (req, res) => {
    const { nom, prenom, formation, date, directeur} = req.body;
    const sql = "INSERT INTO certif (nom, prenom, formation, date, directeur) VALUES (?, ?, ?, ?, ?)";
    const values = [nom, prenom, formation, date, directeur];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'insertion de certif");
        } else {
            res.status(200).send("Nouvel certif ajouté avec succès");
        }
    });
});
router.delete("/certif/:id", (req, res) => {
    const idCertif = req.params.id;
  
    const sql = "DELETE FROM certif WHERE idCertif = ?";
    db.query(sql, idCertif, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de certif :", err);
        res.status(500).send("Erreur lors de la suppression de certif");
      } else {
        res.status(200).send("certif supprimé avec succès");
      }
    });
  });
  router.put('/certif/:id', (req, res) => {
    const id = req.params.id;
    const { nom, prenom, formation, date, directeur } = req.body;

    const sql = "UPDATE certif SET nom=?, prenom=?, formation=?, date=?, directeur=? WHERE idCertif=?";
    const values = [nom, prenom, formation, date, directeur,idCertif];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});
router.get('/certif/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM certif WHERE idCertif = ?';
  db.query(sql, id, (err, result) => {
      if (err) {
          console.error("Erreur lors de la récupération des données de certif :", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des données de certif" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "certif non trouvé" });
      }
      return res.status(200).json(result[0]);
  });
});


  



module.exports = router;
