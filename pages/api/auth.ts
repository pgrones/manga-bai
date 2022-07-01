import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { logError } from '../../lib/firebase/db';

admin.apps[0] ??
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_projectId,
      clientEmail: process.env.clientEmail,
      privateKey: process.env.privateKey!.replace(/\\n/g, '\n')
    })
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  try {
    if (req.method === 'GET' && typeof uid === 'string') {
      const customToken = await admin.auth().createCustomToken(uid);
      res.status(200).json(customToken);
    }
  } catch (error) {
    logError(error);
    res.status(400).end();
  }
  res.status(501).end();
}
