import { signInAnonymously } from 'firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { setUserData } from '../../../firebase/db';
import { auth } from '../../../firebase/firebaseConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const creds = await signInAnonymously(auth);
      await setUserData(creds.user.uid, req.body);
      res.status(200).json(req.body);
    }
  } catch (e) {
    res.status(400).end();
  }
  res.status(501).end();
}
