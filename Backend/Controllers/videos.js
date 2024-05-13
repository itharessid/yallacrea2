const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../Config/db'); // Importez votre module de connexion à la base de données

// Storage configuration for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/videos'); // Utilisez le chemin relatif pour sortir du dossier backend
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.filename;
  const sql = "UPDATE video SET video=?";
  
  db.query(sql, [video], (err, result) => {
    if (err) {
      return res.json({ message: "Error updating video" });
    }
    return res.json({ status: "Success" });
  });
});


router.get('/up',(req,res)=>{
  const sql ='select *from videos';
  db.query(sql,(err,result)=>{
    if(err) return res.json("error");
    return res.json(result);

  })
})

module.exports = router;
