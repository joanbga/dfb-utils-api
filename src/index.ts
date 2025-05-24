import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import cors from 'cors';
import { checkEnvs } from './utils/checkEnvs';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

checkEnvs();

app.use(cors());
// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

// Middleware de gestion des erreurs 404
app.use('*', (_, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trouvé'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Endpoint disponible: POST /api/maptools/hasFourAdjacentCellsFree`);
  console.log(`🔧 Binaire configuré: ${process.env.MAP_TOOLS_BINARY_PATH ? '✅' : '❌'}`);
  console.log(`🗺️ Chemin des maps configuré: ${process.env.MAP_TOOLS_MAPS_PATH ? '✅' : '❌'}`);
});

export default app;