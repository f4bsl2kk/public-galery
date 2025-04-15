const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = 3000;

app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route zum Hochladen
app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/');
});

// Route zum Anzeigen der Bilder
app.get('/images', (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) return res.status(500).json([]);
    res.json(files);
  });
});

// Route zum Löschen von Bildern
app.delete('/delete/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlink(filepath, (err) => {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
