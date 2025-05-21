import client from '../utils/db.js';

export const createPrompt = async (req, res) => {
  try{
    const result = await client.query(
      'INSERT INTO promps ()'
      []
    );
    res.status(201).send('prompt créer avec succès ! ')
  }
  catch(err){}
};
