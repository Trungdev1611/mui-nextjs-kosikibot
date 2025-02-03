import { NextApiRequest, NextApiResponse } from 'next';

const { LINKER_API, WORKSPACE_ID, PROJECT_ID } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
          return res.status(401).json({ message: 'Authorization token is missing' });
        }

      const response = await fetch(`${LINKER_API}/userinfo`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      return res
        .status(response.status)
        .json({ data: await response.json(), message: 'Successful' });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
