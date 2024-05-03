const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(bodyParser.json());

// Endpoint pour envoyer un e-mail
router.post('/sendEmailEtud', (req, res) => {
  const { etudiant, sender } = req.body;

  // Déterminer l'adresse e-mail de l'expéditeur
  const senderEmail = sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com';
  const senderPassword = sender === 'ons' ? 'veki dsby ouya lmky' : 'dgvf qmtw jkcc uukk';

  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
    tls: {
      rejectUnauthorized: false // Désactiver la vérification du certificat SSL
    }
  });

  // Options de l'e-mail
  const mailOptions = {
    from: senderEmail,
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
