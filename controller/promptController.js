import client from '../utils/db.js';

export const createPrompt = async (req, res) => {
  try {
    const { content, title, folder_id } = req.body;
    const user_id = req.user.id;

    const result = await client.query(
      'INSERT INTO prompts (user_id, content, title, folder_id) VALUES($1, $2, $3, $4) RETURNING *',
      [user_id, content, title, folder_id]
    );

    const newPrompt = result.rows[0];

    res.status(201).json({
      message: 'Prompt créé avec succès !',
      prompt: newPrompt,
    });
  } catch (err) {
    console.error('Erreur lors de la création du prompt:', err);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

export const getPrompt = async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await client.query(
      'SELECT * FROM prompts WHERE user_id = $1',
      [user_id]
    );

    res.status(200).json(result.rows); // C'est ici que tu dois renvoyer les données
  } catch (err) {
    console.error('Erreur lors de la récupération des prompts', err);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

export const editPrompt = async (req, res) => {
  const user_id = req.user.id;
  const { title, content, folder_id, id } = req.body;
  try {
    const result = await client.query(
      'UPDATE prompts SET title = $1, content = $2, folder_id = $3 WHERE id = $4 AND user_id = $5 RETURNING *;',
      [title, content, folder_id, id, user_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'Prompt introuvable ou accès interdit 🕵️‍♀️' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de la modification du prompt', err);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

export const deletePrompt = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.body;
  try {
    const result = await client.query(
      'DELETE FROM prompts WHERE id= $1 AND user_id = $2 RETURNING *;',
      [id, user_id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'Prompt introuvable ou accès interdit 🕵️' });
    }

    res
      .status(200)
      .json({ message: 'Prompt supprimé ✅', deleted: result.rows[0] });
  } catch (err) {
    console.error('erreur lors de la supréssion du prompt', err);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};
