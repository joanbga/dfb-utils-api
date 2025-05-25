import { checkDirectoryExistsSync, checkFileExistsSync } from "./fs";

export function checkEnvs() {
    if (!checkFileExistsSync(process.env.MAP_TOOLS_BINARY_PATH)) {
        throw new Error('Erreur de configuration: Vérifiez la variable d\'environnement MAP_TOOLS_BINARY_PATH');
    }

    if (!checkFileExistsSync(process.env.WORLDGRAPH_PATH)) {
        throw new Error('Erreur de configuration: Vérifiez la variable d\'environnement MAP_TOOLS_BINARY_PATH');
    }

    if (!checkDirectoryExistsSync(process.env.MAP_TOOLS_MAPS_PATH)) {
        throw new Error('Erreur de configuration: Vérifiez la variable d\'environnement MAP_TOOLS_MAPS_PATH');
    }
}