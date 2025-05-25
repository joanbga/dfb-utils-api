
import { GetLosCellsRequest, GetMapDataRequest, HasFourAdjacentCellsFreeRequest } from "../types/mapTools.type";
import { executeCommand } from "./binTools";



// Fonction utilitaire pour exécuter le binaire
export async function executehasFourAdjacentCellsFreeCommand(params: HasFourAdjacentCellsFreeRequest): Promise<any> {
  const mapBinsPath = process.env.MAP_TOOLS_MAPS_PATH;

  // Préparer les arguments pour le binaire
  const args = [
    "map",
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
    "map",
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
    "map",
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