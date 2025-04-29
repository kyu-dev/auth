import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import client from '../utils/db.js';

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
