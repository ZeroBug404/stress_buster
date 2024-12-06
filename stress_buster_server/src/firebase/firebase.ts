import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const cred = process.env.FIREBASE_KEY ? JSON.parse(process.env.FIREBASE_KEY) : {};

const app = admin.initializeApp({
  credential: admin.credential.cert(cred),
});

module.exports = admin;
