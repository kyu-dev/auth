import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = 3000;

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: "Documentation de l'API pour l'authentification",
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Le port de ton front avec Vite
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

// Route pour la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log('🚀 Serveur en écoute sur le port 3000 !');
});
