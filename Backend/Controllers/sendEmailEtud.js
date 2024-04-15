const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../Config/db');

// Middleware pour parser le corps des requêtes
// permet de récupérer les données envoyées dans le corps d'une requête HTTP.
router.use(bodyParser.json());

// Endpoint pour envoyer un e-mail
//Définit un point de terminaison HTTP POST à l'URL /sendEmail.
router.post('/sendEmailEtud', (req, res) => {
  const { etudiant } = req.body;

  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elfekihons@gmail.com', // Votre adresse e-mail Gmail
      pass: 'veki dsby ouya lmky', // Votre mot de passe Gmail
    },
  });

  // Options de l'e-mail
  const mailOptions = {
    from: 'elfekihons@gmail.com',
    to: etudiant.email, // Adresse e-mail de l'étudiant
    subject: 'Confirmation de pré-inscription',
    text: `Bonjour ${etudiant.nom} ${etudiant.prenom},\n\nVotre pré-inscription est validée par l'administration et on va vous appeler prochainement pour une réunion présentielle.\n\nCordialement,\nYalla Digital Academy`,
  };

  // Envoyer l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
    } else {
      console.log('E-mail envoyé avec succès :', info.response);
      res.status(200).send('E-mail envoyé avec succès.');
    }
  });
});

module.exports = router;
