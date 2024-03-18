const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const mydb = require('./Config/db');
const rout = require("./routes/route");
const imageRouter = require('./Controllers/image'); // Importez le routeur image

const app = express();
app.use(cors());
app.use(rout);
app.use(imageRouter); // Utilisez le routeur image dans votre application
app.use('/images', express.static('../frontend/public/images'));

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

app.get('/', (req, res) => {
  return res.json("from backend side");
});

app.get('/createur', (req, res) => {
  const sql = "SELECT * FROM createur"; // Correction: Utilisez la variable sql ici
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = app;
