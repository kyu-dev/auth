import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import client from './utils/db.js';

const app = express();
const PORT = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

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
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      const user = result.rows[0];

      if (!user) {
        return done(null, false, { message: 'Utilisateur non trouvé.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Mot de passe incorrect.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
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

// Route pour l'inscription
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const result = await client.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );
    res.status(201).send('Utilisateur créé avec succès.');
  } catch (error) {
    res.status(500).send("Erreur lors de la création de l'utilisateur.");
  }
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
