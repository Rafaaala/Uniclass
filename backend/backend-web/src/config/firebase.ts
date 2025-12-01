import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';

dotenv.config();

// definindo o caminho absoluto para o arquivo JSON com credenciais
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVICE_ACCOUNT_KEY_PATH = path.join(
    __dirname, 
    '..', 
    'docs', 
    'credenciais.json' 
);

let serviceAccountKey: any;

try {
    // Lendo o arquivo JSON como string e convertendo para objeto
    const fileContent = fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    serviceAccountKey = JSON.parse(fileContent);

} catch (error) {
    console.error(`ERRO: Não foi possível carregar o arquivo de credenciais em: ${SERVICE_ACCOUNT_KEY_PATH}`);
    // clg para debug
    // console.error("Detalhes do erro:", error);
    // throw new Error("Falha ao inicializar Firebase Admin SDK. Verifique o caminho da chave.");
}


if (getApps().length === 0) { 
    initializeApp({
        // inicializando usando a credencial de certificado (cert)
        // O objeto serviceAccountKey agora é o JSON puro, sem a chave 'default'
        credential: cert(serviceAccountKey), 
    });
}

const db = getFirestore();

export { db };