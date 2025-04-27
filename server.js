import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3000;

// Fausse base de données d'utilisateurs
const users = [
  {
    id: 1,
    username: 'arthur',
    password: bcrypt.hashSync('lalala', 10),
  },
];

// Configuration de la session
app.use(
  session({
    secret: 'mdp2ouf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Configuration de Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Utilisateur non trouvé.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Mot de passe incorrect.' });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur !');
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Connexion réussie !');
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send('Erreur lors de la déconnexion.');
    }
    res.send('Déconnexion réussie.');
  });
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Bonjour ${req.user.username}`);
  } else {
    res.send('Veuillez vous connecter.');
  }
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
