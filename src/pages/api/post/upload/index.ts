import { createReadStream, unlinkSync } from 'fs';
import { ImgurClient } from 'imgur';

import { FormidableError, parseForm } from '../../../../lib/parse-form';

import type { NextApiRequest, NextApiResponse } from 'next';
const client = new ImgurClient({
	clientId: process.env.IMGUR_CLIENT_ID,
	clientSecret: process.env.IMGUR_CLIENT_SECRET,
	refreshToken: process.env.IMGUR_CLIENT_REFRESH_TOKEN,
});

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse<{
		data: {
			url: string | string[];
		} | null;
		error: string | null;
	}>
) {
	const { method } = req;

	if (method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).json({
			data: null,
			error: 'Method Not Allowed',
		});
		return;
	}

	if (method === 'POST') {
		try {
			const { fields, files } = await parseForm(req);

			const file = files.media;

			const directory = Array.isArray(file)
				? file.map((f) => f.filepath)
				: file.filepath;

			const fileName = Array.isArray(file)
				? file.map((f) => f.newFilename)
				: file.newFilename;

			const { data } = await client.upload({
				image: createReadStream(directory as string) as any,
				title: fileName as string,
				type: 'stream',
			});

			const url = 'https://www.' + String(data.link).slice(10);

			unlinkSync(`public/uploads/${fileName}`);

			res.status(200).json({
				data: {
					url,
				},
				error: null,
			});
		} catch (e) {
			if (e instanceof FormidableError) {
				res.status(e.httpCode || 400).json({ data: null, error: e.message });
			} else {
				console.error(e);
				res.status(500).json({ data: null, error: 'Internal Server Error' });
			}
		}
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
