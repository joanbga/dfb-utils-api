import { spawn } from "child_process";
import { GetLosCellsRequest, GetMapDataRequest, HasFourAdjacentCellsFreeRequest } from "../types/mapTools";

function executeCommand(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const binaryPath = process.env.MAP_TOOLS_BINARY_PATH;

    if (!binaryPath) {
      reject(new Error('MAP_TOOLS_BINARY_PATH n\'est pas défini dans les variables d\'environnement'));
      return;
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
        resolve(stdout.trim());
      } else {
        reject(new Error(`Erreur de commande : ${stderr || stdout}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Erreur lors de l'exécution de la commande : ${error.message}`));
    });
  });
}

// Fonction utilitaire pour exécuter le binaire
export async function executehasFourAdjacentCellsFreeCommand(params: HasFourAdjacentCellsFreeRequest): Promise<any> {
  const mapBinsPath = process.env.MAP_TOOLS_MAPS_PATH;

  // Préparer les arguments pour le binaire
  const args = [
    `${mapBinsPath}/map_${params.mapId}.bin`, // Chemin vers le fichier de la map
    'hasFourAdjacentCellsFree',
    params.cellId.toString()
  ];

  // Ajouter les cellules occupées si fournies
  if (params.occupiedCells && params.occupiedCells.length > 0) {
    args.push(...params.occupiedCells.map(cell => cell.toString()));
  }
  // Exécuter la commande
  return executeCommand(args);
}

export async function executeGetLosCellsCommand(params: GetLosCellsRequest): Promise<any> {
  const mapBinsPath = process.env.MAP_TOOLS_MAPS_PATH;

  // Préparer les arguments pour le binaire
  const args = [
    `${mapBinsPath}/map_${params.mapId}.bin`, // Chemin vers le fichier de la map
    'getLosCells',
    params.cellId.toString()
  ];

  // Ajouter les cellules occupées si fournies
  if (params.occupiedCells && params.occupiedCells.length > 0) {
    args.push(...params.occupiedCells.map(cell => cell.toString()));
  }
  // Exécuter la commande
  return executeCommand(args);
}

export async function executeGetMapDataJson(params: GetMapDataRequest): Promise<any> {
  const mapBinsPath = process.env.MAP_TOOLS_MAPS_PATH;

  // Préparer les arguments pour le binaire
  const args = [
    `${mapBinsPath}/map_${params.mapId}.bin`, // Chemin vers le fichier de la map
    'getMapDataJson'
  ];

  // Ajouter les cellules occupées si fournies
  // if (params.occupiedCells && params.occupiedCells.length > 0) {
  //   args.push(...params.occupiedCells.map(cell => cell.toString()));
  // }
  // Exécuter la commande
  return executeCommand(args);
}