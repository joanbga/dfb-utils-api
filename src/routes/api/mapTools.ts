import { Router } from 'express';
import { hasFourAdjacentCellsFreeSchema } from '../../types/mapTools';
import { executeBinary } from '../../utils/mapTools';
import { ApiResponse } from '../../types/api';
import z from 'zod';

const router = Router();

// Endpoint POST /api/maptools/hasFourAdjacentCellsFree
router.post('/hasFourAdjacentCellsFree', async (req, res) => {
  try {
    // Validation du schema avec Zod
    const validatedData = hasFourAdjacentCellsFreeSchema.parse(req.body);

    // Exécuter le binaire
    const result = await executeBinary(validatedData);

    const response: ApiResponse = {
      success: true,
      data: result
    };

    res.json(response);
  } catch (error) {
    let errorMessage = 'Erreur interne du serveur';
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      // Erreur de validation Zod
      errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      statusCode = 400;
    } else if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes('MAP_TOOLS_BINARY_PATH')) {
        statusCode = 500; // Erreur de configuration serveur
      }
    }

    const response: ApiResponse = {
      success: false,
      error: errorMessage
    };

    res.status(statusCode).json(response);
  }
});

export default router;