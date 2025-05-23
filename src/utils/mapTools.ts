import { spawn } from "child_process";
import { HasFourAdjacentCellsFreeRequest } from "../types/mapTools";

// Fonction utilitaire pour exécuter le binaire
export async function executeBinary(params: HasFourAdjacentCellsFreeRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    const binaryPath = process.env.MAP_TOOLS_BINARY_PATH;
    const mapBinsPath = process.env.MAP_TOOLS_MAPS_PATH;
    
    if (!binaryPath) {
      reject(new Error('MAP_TOOLS_BINARY_PATH n\'est pas défini dans les variables d\'environnement'));
      return;
    }

    // Préparer les arguments pour le binaire
    const args = [
      `${mapBinsPath}\\map_${params.mapId}.bin`, // Chemin vers le fichier de la map
      'hasFourAdjacentCellsFree',
      params.cellId.toString()
    ];

    // Ajouter les cellules occupées si fournies
    if (params.occupiedCells && params.occupiedCells.length > 0) {
      args.push(...params.occupiedCells.map(cell => cell.toString()));
    }

    const child = spawn(binaryPath, args);
    
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        try {
          // Tenter de parser la sortie JSON
          const result = stdout;
          resolve(result);
        } catch (parseError) {
          // Si ce n'est pas du JSON, retourner la sortie brute
          resolve({ output: stdout.trim() });
        }
      } else {
        reject(new Error(`${stderr || stdout || "Error"}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Erreur lors de l'exécution du binaire: ${error.message}`));
    });
  });
}