const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const router = express.Router();
router.use(bodyParser.json());

router.post('/refutationEmailEtud', async (req, res) => {
  try {
    const { etudiant, sender } = req.body;

    let transporter;
    if (sender === 'ons' || sender === 'ithar') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com',
          pass: sender === 'ons' ? 'veki dsby ouya lmky' : 'dgvf qmtw jkcc uukk',
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    } else {
      throw new Error('Sender not recognized.');
    }

    const mailOptions = {
      from: sender === 'ons' ? 'elfekihons@gmail.com' : 'ithar3333@gmail.com',
      to: etudiant.email,
      subject: 'Refus de pré-inscription',
      text: `Bonjour ${etudiant.nom} ${etudiant.prenom}, Votre pré-inscription, malheureusement, n'a pas été approuvée par l'administration. Nous vous remercions pour votre intérêt et restons à votre disposition pour toute question supplémentaire. Cordialement, Yalla Digital Academy`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send('E-mail envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
  }
});

module.exports = router;
