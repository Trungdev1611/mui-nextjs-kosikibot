import { NextApiRequest, NextApiResponse } from 'next';

const { LINKER_API, WORKSPACE_ID, PROJECT_ID } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { user_code, password } = req.body;

      const response = await fetch(`${LINKER_API}/login`, {
        method: 'POST',
        body: JSON.stringify({
          user_code,
          password,
        }),
      });
      const responseBody = await response.json()
      return res
        .status(response.status)
        .json({ data: responseBody, message: response.statusText });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw res
      .status(500)
      .json({  message: 'Login fail' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


