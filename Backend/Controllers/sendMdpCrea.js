const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Fonction pour créer un transporteur SMTP en fonction de l'expéditeur
const createTransporter = (sender) => {
  // Déterminer l'adresse e-mail et le mot de passe en fonction de l'expéditeur
  const senderEmail = sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com';
  const senderPassword = sender === 'ons' ? 'veki dsby ouya lmky' : 'dgvf qmtw jkcc uukk';

  // Créer et retourner le transporteur SMTP
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail, // Adresse e-mail utilisée pour envoyer les e-mails
      pass: senderPassword // Mot de passe de l'adresse e-mail
    },
    tls: {
      rejectUnauthorized: false // Désactiver la vérification du certificat SSL
    }
  });
};

// Fonction pour envoyer un e-mail au créateur contenant le mot de passe
const sendPasswordEmailCrea = async (creaEmail, password, sender) => {
  try {
    // Créer le transporteur SMTP en fonction de l'expéditeur
    const transporter = createTransporter(sender);

    // Envoyer l'e-mail avec un modèle HTML
    await transporter.sendMail({
      from: transporter.options.auth.user, // Adresse e-mail de l'expéditeur
      to: creaEmail, // Adresse e-mail du destinataire (créateur)
      subject: 'Nouveau mot de passe', // Sujet de l'e-mail
      html: `
      <p>Bonjour,</p>
      <p>Votre mot de passe pour vous connecter a été réinitialisé avec succès.</p>
      <p>Voici vos informations de connexion :</p>
      <p><strong>E-mail:</strong> ${creaEmail}</p>
      <p><strong>Mot de passe:</strong> ${password}</p>
      <p>Connectez-vous dès maintenant pour accéder à votre compte.</p>
      <p>Cordialement,</p>
      <p>Votre équipe de Yalla Digital Academy</p>
      `
    });

    console.log('E-mail envoyé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error('Une erreur est survenue lors de l\'envoi de l\'e-mail.');
  }
};

// Endpoint pour envoyer un e-mail contenant un mot de passe au créateur
router.post('/sendPasswordEmailCrea', async (req, res) => {
  const { creaEmail, password, sender } = req.body;

  try {
    // Validation des données d'entrée
    if (!creaEmail || !password || !sender) {
      throw new Error('Adresse e-mail de créateur, mot de passe ou expéditeur manquant.');
    }

    // Appeler la fonction pour envoyer l'e-mail avec le mot de passe
    await sendPasswordEmailCrea(creaEmail, password, sender);

    // Répondre à la demande avec un statut de réussite
    res.status(200).send('E-mail envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).send(error.message || 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
  }
});

module.exports = router;
