const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Endpoint pour ajouter un commentaire à une vidéo
router.post('/video/commentaire', (req, res) => {
    const { textComment, dateComment, idVideo } = req.body;
    const sql = "INSERT INTO commentaire (textComment, dateComment, idVideo) VALUES (?, ?, ?)";
    const values = [textComment, dateComment, idVideo];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'ajout du commentaire");
      } else {
        res.status(200).send("Le commentaire a été ajouté avec succès");
      }
    });
  });

// Endpoint pour récupérer les commentaires d'une vidéo par son ID
router.get('/video/commentaire/:idVideo', (req, res) => {
    const idVideo = req.params.idVideo;
    const sql = "SELECT * FROM commentaire WHERE idVideo = ?";
    db.query(sql, idVideo, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des commentaires");
      } else {
        res.status(200).json(data);
      }
    });
  });

// Endpoint pour supprimer un commentaire par son ID
router.delete('/video/commentaire/:idVideo/:idComment', (req, res) => {
    const idComment = req.params.idComment;
    const sql = "DELETE FROM commentaire WHERE idComment = ?";
    db.query(sql, idComment, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression du commentaire");
      } else {
        res.status(200).send("Le commentaire a été supprimé avec succès");
      }
    });
  });

  
module.exports = router;
