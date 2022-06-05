import { NextApiRequest, NextApiResponse } from 'next';
import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../lib/firebase/ServiceAccountKey.json';

admin.apps[0] ??
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  try {
    if (req.method === 'GET' && typeof uid === 'string') {
      console.log(uid, uid.length);
      const customToken = await admin.auth().createCustomToken(uid);
      res.status(200).json(customToken);
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
  res.status(501).end();
}
