import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: 'mdp2ouf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Serveur en marche !');
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
