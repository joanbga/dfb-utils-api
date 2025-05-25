import { Router } from 'express';
import { getLosCellsSchema, getMapDataSchema, hasFourAdjacentCellsFreeSchema } from '../../types/mapTools.type';
import { executeGetLosCellsCommand, executeGetMapDataJson, executehasFourAdjacentCellsFreeCommand } from '../../utils/mapTools';
import { ApiResponse } from '../../types/api';
import z from 'zod';

const router = Router();

// Endpoint POST /api/maptools/hasFourAdjacentCellsFree
router.post('/hasFourAdjacentCellsFree', async (req, res) => {
  try {
    // Validation du schema avec Zod
    const validatedData = hasFourAdjacentCellsFreeSchema.parse(req.body);

    // Exécuter le binaire
    const result = await executehasFourAdjacentCellsFreeCommand(validatedData);

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

router.get('/get-map-data/:mapId', async (req, res) => {
  try {
    // Validation du schema avec Zod
    const validatedData = getMapDataSchema.parse(req.params);

    // Exécuter le binaire
    const result = await executeGetMapDataJson(validatedData);

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

router.post('/get-los-cells', async (req, res) => {
  try {
    // Validation du schema avec Zod
    const validatedData = getLosCellsSchema.parse(req.body);

    // Exécuter le binaire
    const result = await executeGetLosCellsCommand(validatedData);

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