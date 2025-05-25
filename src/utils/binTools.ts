import { spawn } from "child_process";

export function executeCommand(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        const binaryPath = process.env.MAP_TOOLS_BINARY_PATH;

        if (!binaryPath) {
            reject(new Error('MAP_TOOLS_BINARY_PATH n\'est pas défini dans les variables d\'environnement'));
            return;
        }

        const child = spawn(binaryPath, args);

        let stdout = '';
        let stderr = '';
        console.log(`Exécution de la commande : ${binaryPath} ${args.join(' ')}`);
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