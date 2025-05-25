// getNeighborsDetailed

import { GetNeighborsDetailedRequest } from "../types/worldgraphTools.type";
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