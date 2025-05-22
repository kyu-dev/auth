export default function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.id) {
    return next();
  }
  res.status(401).json({ error: 'Vous devez être connecté.' });
}
