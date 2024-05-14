  const express = require('express');
  const router = express.Router();
  const db = require('../Config/db');

  router.post('/video/commentaire/:idVideo/:idCrea', (req, res) => {
    const { textComment } = req.body;
    const idVideo = req.params.idVideo;
    const idCrea = req.params.idCrea;
    const dateComment = new Date(); // Vous pouvez ajouter la date actuelle ici si besoin
    const sql = "INSERT INTO commentaire (textComment, dateComment, idVideo, idCrea) VALUES (?, ?, ?, ?)";
    const values = [textComment, dateComment, idVideo, idCrea];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Erreur lors de l'ajout du commentaire :", err);
        return res.status(500).send("Erreur lors de l'ajout du commentaire");
      }
      return res.status(200).send("Le commentaire a été ajouté avec succès");
    });
  });
  
  router.get('/video/commentaire/:idVideo/:idCrea', (req, res) => {
    const idVideo = req.params.idVideo;
    const idCrea = req.params.idCrea;
    const sql = "SELECT * FROM commentaire WHERE idVideo = ? AND idCrea = ?";
    const values = [idVideo, idCrea];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erreur lors de la récupération des commentaires");
        } else {
            return res.status(200).json(data);
        }
    });
});

router.delete('/video/commentaire/:idVideo/:idComment/:idCrea', (req, res) => {
  const idComment = req.params.idComment;
  const sql = "DELETE FROM commentaire WHERE idComment = ?";
  db.query(sql, idComment, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Erreur lors de la suppression du commentaire");
      }
      return res.status(200).send("Le commentaire a été supprimé avec succès");
  });
});

  
  module.exports = router;