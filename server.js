import express from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur !');
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
