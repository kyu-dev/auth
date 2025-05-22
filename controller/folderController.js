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

export const getFolder = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await client.query(
      'SELECT * FROM folders WHERE user_id = $1',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération du folder', err);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

export const editFolder = async (req, res) => {
  const user_id = req.user.id;
  const { title, id } = req.body;
  try {
    const result = await client.query(
      'UPDATE folders SET title = $1 WHERE user_id = $2 AND id= $3 RETURNING *',
      [title, user_id, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreure lors de la modification du folder');
    res.status(500).json({ message: "Une erreur s'est produit" });
  }
};
