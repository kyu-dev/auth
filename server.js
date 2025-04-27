import express from 'express';
import session from 'express-session';
const app = express();
const PORT = 3000;

app.use(
  session({
    secret: 'mdp2ouf',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur !');
});

app.get('/login', (req, res) => {
  req.session.user = { id: 1, name: 'Arthur' }; // Stocker des données dans la session
  res.send('Vous êtes connecté !');
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`Bonjour ${req.session.user.name}`);
  } else {
    res.send('Veuillez vous connecter.');
  }
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
