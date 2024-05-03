const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const https = require('https');

const router = express.Router();
router.use(bodyParser.json());

router.post('/refutationEmailCrea', async (req, res) => {
  try {
    const { createur, sender } = req.body;

    let transporter;
    if (sender === 'ons' || sender === 'ithar') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com',
          pass: sender === 'ons' ? 'veki dsby ouya lmky' : 'dgvf qmtw jkcc uukk',
        },
        tls: {
          rejectUnauthorized: false // Permet de ne pas vérifier les certificats SSL
        }
      });
    } else {
      throw new Error('Sender not recognized.');
    }

    const mailOptions = {
      from: sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com',
      to: createur.email,
      subject: 'Refus de pré-inscription',
      text: `Bonjour ${createur.nom} ${createur.prenom},
      \n\nVotre pré-inscription, malheureusement, n'a pas été approuvée par l'administration.\nNous vous remercions pour votre intérêt et restons à votre disposition pour toute question supplémentaire.\n\nCordialement,\nYalla Digital Academy`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('E-mail envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
  }
});

module.exports = router;
