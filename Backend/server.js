const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const mydb = require('./Config/db');
const rout = require("./routes/route");
const textRouter = require('./Controllers/texte'); // Importez le routeur text
const imageRouter = require('./Controllers/image'); // Importez le routeur image
const calendrierRouter = require('./Controllers/calendrier');
const etudiantRouter=require('./Controllers/etudiant')
const expertRouter=require('./Controllers/expertcontrolllers.js')


const app = express();
app.use(cors());
app.use(express.json())
app.use(rout);
app.use('/text', textRouter); // Utilisez le routeur text dans votre application
app.use(imageRouter); // Utilisez le routeur image dans votre application
app.use('/images', express.static('../frontend/public/images'));

app.use(calendrierRouter);
app.use(etudiantRouter);
app.use( expertRouter); 
app.use('/photo', express.static('../frontend/public/photo'));

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
