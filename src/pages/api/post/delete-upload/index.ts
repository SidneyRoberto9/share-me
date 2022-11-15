import { unlinkSync } from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	if (method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}

	if (method === 'POST') {
		try {
			const { fileName } = req.body;
			unlinkSync(`public/uploads/${fileName}`);

			res.status(200).json({ error: null });
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}
