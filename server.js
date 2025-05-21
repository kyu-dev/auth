import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import ensureAuthenticated from './middleware/authMiddleware.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Le port du front avec Vite
    credentials: true,
  })
);
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
app.use('/prompt', promptRoutes);
app.get('/api/me', ensureAuthenticated, (req, res) => {
  // req.user contient l'objet utilisateur désérialisé depuis la session
  const { id, username, email } = req.user;

  res.status(200).json({
    id: id,
    username,
    email,
  });
});

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
