// importer les modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// créer une instance du routeur Express
const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(bodyParser.json());

// Endpoint pour envoyer un e-mail
router.post('/sendEmailCrea', (req, res) => {
  const { createur, sender } = req.body;

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
    to: createur.email, // Adresse e-mail du destinataire
    subject: 'Confirmation de pré-inscription',
    text: `Bonjour ${createur.nom} ${createur.prenom},\n\nVotre pré-inscription a été approuvée par l'administration, et vous serez contacté prochainement pour convenir d'une réunion en personne.\n\nCordialement,\nYalla Digital Academy`,
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

// Exporter le routeur
module.exports = router;
