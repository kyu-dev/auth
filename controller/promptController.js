import client from '../utils/db.js';

export const createPrompt = async (req, res) => {
  try {
    const { content, title, folder_id } = req.body;
    const { user_id } = req.user;

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
    res.status(500).json({ error: 'Une erreur est survenue.' });
  }
};
