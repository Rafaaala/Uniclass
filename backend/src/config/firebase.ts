import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

if (getApps().length === 0) { 
    initializeApp({
        credential: applicationDefault(),
    });
}

const db = getFirestore();

export { db };
