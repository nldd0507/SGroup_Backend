import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const pathToDataFile = path.join(process.cwd(), 'data.json');

export const writeData = async (data) => {
    try {
        await fs.promises.writeFile(pathToDataFile, JSON.stringify(data, null, 2), 'utf-8');
    }
    catch (error) {
        console.error("Error while writting data: ", error);
        throw error;
    }
}