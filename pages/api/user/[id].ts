import { NextApiRequest, NextApiResponse } from 'next';
import { getUserData } from '../../../firebase/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === 'GET' && typeof id === 'string') {
      const userData = await getUserData(id);
      res.status(200).json(userData);
    }
  } catch (e) {
    res.status(400).end();
  }
  res.status(501).end();
}
