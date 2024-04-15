const express = require('express');
const router = express.Router();
const db = require('../Config/db');

router.use(express.json());

router.get("/preinscriEtudiant", (req, res) => {
    db.query("SELECT * FROM preinscrietud", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de la récupération des pré-inscriptions des étudiants");
        } else {
            res.send(result);
        }
    });
});

router.post("/preinscriEtudiant", (req, res) => {
    const { nom, prenom, adresse, anniversaire, num, email, niveau, programme } = req.body;
    const sql = "INSERT INTO preinscrietud (nom,prenom,adresse,anniversaire,num,email,niveau,programme) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nom, prenom, adresse, anniversaire, num, email, niveau, programme];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erreur lors de l'insertion de l'étudiant");
        } else {
            res.status(200).send("Nouvel étudiant ajouté avec succès");
        }
    });
});
router.delete("/preinscriEtudiant/:id", (req, res) => {
    const idPEtudiant = req.params.id;
  
    const sql = "DELETE FROM preinscrietud WHERE id = ?";
    db.query(sql, idPEtudiant, (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression de l'étudiant :", err);
        res.status(500).send("Erreur lors de la suppression de l'étudiant");
      } else {
        res.status(200).send("Étudiant supprimé avec succès");
      }
    });
  });
router.get('/preinscriEtudiant/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM preinscrietud WHERE id = ?';
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
