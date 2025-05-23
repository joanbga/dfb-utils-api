import fs from 'fs';

export function checkFileExistsSync(filePath: string | undefined): boolean {
    if (!filePath) {
        console.error('File path is undefined');
        return false;
    }
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        console.error(`Error checking file existence: ${err}`);
        return false;
    }
}

export function checkDirectoryExistsSync(dirPath: string | undefined): boolean {
    if (!dirPath) {
        console.error('Directory path is undefined');
        return false;
    }
    try {
        return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
    } catch (err) {
        console.error(`Error checking directory existence: ${err}`);
        return false;
    }
}