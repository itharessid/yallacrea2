const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.use(express.json());

router.get("/preinscriCrea", (req, res) => {
    db.query("SELECT * FROM preinscricrea", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la récupération des pré-inscriptions des créateurs");
        } else {
            res.send(result);
        }
    });
});

router.post("/preinscriCrea", (req, res) => {
    const { nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace,lienTik,domaine} = req.body;
    const sql = "INSERT INTO preinscricrea (nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace,lienTik,domaine) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [nom, prenom, adresse, anniversaire, num, email, lienInsta, lienFace,lienTik,domaine];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de l'insertion de créateur");
        } else {
            res.status(200).send("Nouvel créateur ajouté avec succès");
        }
    });
});
router.delete("/preinscriCrea/:id", (req, res) => {
    const idPCrea = req.params.id;
  
    const sql = "DELETE FROM preinscricrea WHERE id = ?";
    db.query(sql, idPCrea, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de créateur :", err);
        res.status(500).send("Erreur lors de la suppression de créateur");
      } else {
        res.status(200).send("Créatur supprimé avec succès");
      }
    });
  });
router.get('/preinscriCrea/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM preinscricrea WHERE id = ?';
  db.query(sql, id, (err, result) => {
      if (err) {
          console.error("Erreur lors de la récupération des données de créateur :", err);
          return res.status(500).json({ error: "Erreur lors de la récupération des données de créateur" });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: "Créateur non trouvé" });
      }
      return res.status(200).json(result[0]);
  });
});


  



module.exports = router;
