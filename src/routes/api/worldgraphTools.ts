import { Router } from 'express';
import { getNeighborsDetailedSchema } from '../../types/worldgraphTools.type';
import { executeGetNeighborsDetailedCommand } from '../../utils/worldgraphTools';
import { ApiResponse } from '../../types/api';
import z from 'zod';

const router = Router();

// Endpoint POST /api/maptools/hasFourAdjacentCellsFree
router.post('/getNeighborsDetailed', async (req, res) => {
  try {
    // Validation du schema avec Zod
    const validatedData = getNeighborsDetailedSchema.parse(req.body);
    console.log(validatedData)
    // Exécuter le binaire
    const result = await executeGetNeighborsDetailedCommand(validatedData);



    const response: ApiResponse = {
      success: true,
      data: JSON.parse(result)
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