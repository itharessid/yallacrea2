const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const mydb = require('./Config/db');
const rout = require("./routes/route");
const textRouter = require('./Controllers/texte'); // Importez le routeur text
const imageRouter = require('./Controllers/image'); // Importez le routeur image
const eventsRouter=require('./Controllers/evenement');
const calendrierRouter = require('./Controllers/calendrier');
const etudiantRouter=require('./Controllers/etudiant')
const expertRouter=require('./Controllers/expertcontrolllers.js')
const partenaireRouter=require('./Controllers/partenairecontrollers.js')
const domaineRouter=require('./Controllers/domaines.js');
const createurRouter=require('./Controllers/createurs.js');
const preInscriEtudRouter=require('./Controllers/preInscriptionEtud.js');
const preInscriCreaRouter=require('./Controllers/preInscriptionCrea.js');
const sendEmailEtudRouter=require('./Controllers/sendEmailEtud.js');
const sendEmailCreaRouter=require('./Controllers/sendEmailCrea.js');
const evenementRouter=require('./Controllers/evenement.js');
const refusEmailCreaRouter=require('./Controllers/refutationEmailCrea.js');
const refusEmailEtudRouter=require('./Controllers/refutationEmailEtud.js');

const app = express();
app.use(cors());
app.use(express.json())
app.use(rout);
app.use('/text', textRouter); // Utilisez le routeur text dans votre application
app.use(imageRouter); // Utilisez le routeur image dans votre application
app.use('/images', express.static('../frontend/public/images'));

app.use(calendrierRouter);
app.use(etudiantRouter);
app.use(partenaireRouter);
app.use( expertRouter); 
app.use('/photo', express.static('../frontend/public/photo'));
app.use(domaineRouter);
app.use(createurRouter);
app.use(domaineRouter);
app.use(preInscriEtudRouter);
app.use(preInscriCreaRouter);
app.use(sendEmailEtudRouter);
app.use(sendEmailCreaRouter);
app.use(evenementRouter);
app.use('/evenement',express.static('../frontend/public/evenements'));
app.use(refusEmailCreaRouter);
app.use(refusEmailEtudRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'yallacrea'
});

app.get('/test', (req, res) => {
  res.send("ons");
});




module.exports = app;
