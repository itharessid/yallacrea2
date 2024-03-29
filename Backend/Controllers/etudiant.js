const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Middleware pour analyser le corps de la requête JSON
router.use(express.json());

router.get("/etudiant", (req, res) => {
    db.query("SELECT * FROM etudiants", (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des étudiants");
      } else {
        res.send(result);
      }
    });
  });

router.post("/etudiant", (req, res) => {
    const { nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo } = req.body;
    const sql = "INSERT INTO etudiants (nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de l'insertion de l'étudiant");
        } else {
            res.status(200).send("Nouvel étudiant ajouté avec succès");
        }
    });
});
router.delete("/etudiant/:id", (req, res) => {
    const idEtudiant = req.params.id;
  
    const sql = "DELETE FROM etudiants WHERE id = ?";
    db.query(sql, idEtudiant, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de l'étudiant :", err);
        res.status(500).send("Erreur lors de la suppression de l'étudiant");
      } else {
        res.status(200).send("Étudiant supprimé avec succès");
      }
    });
  });
  router.put('/etudiant/:id', (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo } = req.body;

    const sql = "UPDATE etudiants SET nom=?, prenom=?, email=?, adresse=?, numero=?, anniversaire=?, niveau=?, programme=?, codePromo=? WHERE id=?";
    const values = [nom, prenom, email, adresse, numero, anniversaire, niveau, programme, codePromo,id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});
router.get('/etudiant/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM etudiants WHERE id = ?';
  db.query(sql, id, (err, result) => {
      if (err) {
          console.error("Erreur lors de la récupération des données de l'etudiant :", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des données de l'etudiant" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "Etudiant non trouvé" });
      }
      return res.status(200).json(result[0]);
  });
});


  



module.exports = router;
