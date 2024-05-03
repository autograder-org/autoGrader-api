import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routesFilePath = join(__dirname, './src/routes/routes.ts');
let content = readFileSync(routesFilePath, 'utf8');
content = content.replace(/from '(\..*?)'/g, "from '$1.js'");
writeFileSync(routesFilePath, content);