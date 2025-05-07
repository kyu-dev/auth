import express from 'express';
import {
  loginUser,
  logoutUser,
  profile,
  register,
} from '../controller/authController.js';
import passport from 'passport';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Permet à un utilisateur de se connecter.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
router.post('/login', passport.authenticate('local'), loginUser);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Déconnexion de l'utilisateur
 *     description: Permet à un utilisateur de se déconnecter.
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.get('/logout', logoutUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Profil de l'utilisateur
 *     description: Récupère le profil de l'utilisateur connecté.
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 */
router.get('/profile', profile);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Permet à un nouvel utilisateur de s'inscrire.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */
router.post('/register', register);

export default router;
