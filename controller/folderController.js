import client from '../utils/db.js';

export const createFolder = async (req, res) => {
  const user_id = req.user.id;
  const { title } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO folders (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, user_id]
    );
    const newFolder = result.rows[0];
    res.status(201).json({
      message: 'Folder créé avec succès !',
      folder: newFolder,
    });
  } catch (err) {
    console.error('Erreur lors de la création du folder:', err);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};
