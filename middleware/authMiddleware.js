export default function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .send('Vous devez être connecté pour accéder à cette ressource.');
}
