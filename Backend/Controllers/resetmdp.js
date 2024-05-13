const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const router = express.Router();

// Middleware pour parser le corps des requêtes
router.use(bodyParser.json());

// Endpoint pour envoyer un e-mail de réinitialisation de mot de passe
router.post('/resetPassword', async (req, res) => {
  const { email, sender } = req.body; // Récupérez le paramètre sender de la requête

  // Génération d'un mot de passe aléatoire
  const newPassword = Math.random().toString(36).slice(-8); // Génère un mot de passe aléatoire de 8 caractères

  // Déterminer l'adresse e-mail de l'expéditeur
  const senderEmail = sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com';
  const senderPassword = sender === 'ons' ? 'veki dsby ouya lmky' : 'dgvf qmtw jkcc uukk';

  try {
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
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Bonjour,

      Nous avons reçu une demande de réinitialisation de votre mot de passe.
      
      Votre nouveau mot de passe est : ${newPassword}
      
      Nous vous recommandons de changer ce mot de passe dès que possible pour des raisons de sécurité.
      
      Cordialement,
      YALLA Digital Academy`
    };

    // Envoyer l'e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info.response);
    res.status(200).send('E-mail de réinitialisation envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation :', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de réinitialisation.');
  }
});

module.exports = router;
