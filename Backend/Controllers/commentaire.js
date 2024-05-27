const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Backend (Node.js / Express.js)

// Dans la route POST pour ajouter un commentaire ou une réponse
router.post('/video/commentaire/:idVideo/:idCrea', (req, res) => {
  const { textComment, idRepondre } = req.body; // Renommez parentId en idRepondre
  const idVideo = req.params.idVideo;
  const idCrea = req.params.idCrea;
  const dateComment = new Date();
  const sql = "INSERT INTO commentaire (textComment, dateComment, idVideo, idCrea, idRepondre) VALUES (?, ?, ?, ?, ?)";
  const values = [textComment, dateComment, idVideo, idCrea, idRepondre || null]; // Utilisez idRepondre pour spécifier le commentaire parent
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du commentaire :", err);
      return res.status(500).send("Erreur lors de l'ajout du commentaire");
    }
    return res.status(200).send("Le commentaire a été ajouté avec succès");
  });
});

// Dans la route GET pour récupérer les commentaires et leurs réponses
router.get('/video/commentaire/:idVideo/:idCrea', (req, res) => {
  const idVideo = req.params.idVideo;
  const idCrea = req.params.idCrea;
  const sql = `
    SELECT * FROM commentaire WHERE idVideo = ? AND idCrea = ? ORDER BY dateComment;
  `;
  const values = [idVideo, idCrea];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la récupération des commentaires");
    } else {
      // Organiser les commentaires en un arbre pour inclure les réponses
      const comments = data.filter(comment => !comment.idRepondre);
      const replies = data.filter(comment => comment.idRepondre);

      comments.forEach(comment => {
        comment.replies = replies.filter(reply => reply.idRepondre === comment.idComment); // Utilisez replies au lieu de reponses
      });

      return res.status(200).json(comments);
    }
  });
});

// Dans la route DELETE pour supprimer un commentaire
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

