const express = require('express');
const router = express.Router();
const db = require('../Config/db');

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

router.post('/certif', (req, res) => {
    const { nom, prenom, type, formation, date, directeur } = req.body;

    const sql = "INSERT INTO certif (nom, prenom, type, formation, date, directeur) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [nom, prenom, type, formation, date, directeur];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion dans la base de données" });
        }
        return res.status(200).json({ message: "Données insérées avec succès" });
    });
});

router.delete("/certif/:idCertif", (req, res) => {
    const idCertif = req.params.idCertif;
  
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

router.put('/certif/:idCertif', (req, res) => {
    const idCertif = req.params.idCertif;
    const { nom, prenom, type, formation, date, directeur } = req.body;

    const sql = "UPDATE certif SET nom=?, prenom=?, type=?, formation=?, date=?, directeur=? WHERE idCertif=?";
    const values = [nom, prenom, type, formation, date, directeur, idCertif];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour des données dans la base de données :", err);
            return res.status(500).json({ error: "Erreur lors de la mise à jour des données dans la base de données" });
        }
        return res.status(200).json({ message: "Données mises à jour avec succès" });
    });
});

router.get('/certif/:idCertif', (req, res) => {
    const idCertif = req.params.idCertif;
    const sql = 'SELECT * FROM certif WHERE idCertif = ?';
    db.query(sql, idCertif, (err, result) => {
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
