import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
  await client.connect();
  console.log('✅ Connecté à la base de données PostgreSQL avec succès.');
} catch (error) {
  console.error(
    '❌ Erreur lors de la connexion à la base de données PostgreSQL :',
    error
  );
  process.exit(1); // Arrête l'application en cas d'erreur de connexion
}

export default client;
