const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db'); // Importez votre module de connexion à la base de données

// Storage configuration for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/evenements'); // Utilisez le chemin relatif pour sortir du dossier backend
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image n'a été téléchargée" });
    }

  const photo = req.file.filename;
  const sql = "UPDATE evenements SET image=?";
  
  db.query(sql, [photo], (err, result) => {
    if (err) {
      return res.json({ message: "Error updating image" });
    }
    return res.json({ status: "Success" });
  });
});


router.get('/up',(req,res)=>{
  const sql ='select *from evenements';
  db.query(sql,(err,result)=>{
    if(err) return res.json("error");
    return res.json(result);

  })
})

module.exports = router;
