// getNeighborsDetailed

import { GetMapsToDirectionRequest, GetNeighborsDetailedRequest, PathfindingRequest } from "../types/worldgraphTools.type";
import { executeCommand } from "./binTools";

export async function executeGetNeighborsDetailedCommand(params: GetNeighborsDetailedRequest): Promise<any> {
    const worldgraphBinPath = process.env.WORLDGRAPH_PATH;

    // Préparer les arguments pour le binaire
    const args = [
        "worldgraph",
        `${worldgraphBinPath}`, // Chemin vers le fichier de la map
        'getNeighborsDetailed',
        params.mapId.toString()
    ];

    // Ajouter les cellules occupées si fournies
    if (params.direction !== undefined) {
        args.push(params.direction.toString());
    }
    // Exécuter la commande
    return executeCommand(args);
}

export async function executePathfindingCommand(params: PathfindingRequest): Promise<any> {
    const worldgraphBinPath = process.env.WORLDGRAPH_PATH;

    // Préparer les arguments pour le binaire
    const args = [
        "worldgraph",
        `${worldgraphBinPath}`, // Chemin vers le fichier de la map
        'pathfinding',
        params.startMapId,
        params.endMapId
    ];

    // Ajouter les cellules occupées si fournies
    if (params.knownZaaps !== undefined) {
        args.push(...params.knownZaaps);
    }
    // Exécuter la commande
    return executeCommand(args);
}

export async function executeGetMapsToDirectionCommand(params: GetMapsToDirectionRequest): Promise<any> {
    const worldgraphBinPath = process.env.WORLDGRAPH_PATH;

    // Préparer les arguments pour le binaire
    const args = [
        "worldgraph",
        `${worldgraphBinPath}`, // Chemin vers le fichier de la map
        'getMapsToDirection',
        params.mapId.toString(),
        params.direction.toString()
    ];

    // Ajouter la longueur si fournie
    if (params.length !== undefined) {
        args.push(params.length.toString());
    }
    // Exécuter la commande
    return executeCommand(args);
}