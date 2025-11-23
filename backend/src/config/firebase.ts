import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
    admin.initializeApp({
        credential: applicationDefault(),
    });
}

const db = admin.firestore();

export { db, admin };
