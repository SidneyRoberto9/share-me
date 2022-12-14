import { FormidableError, parseForm } from '../../../../lib/parse-form';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse<{
		data: {
			url: string | string[];
			fileName: string | string[];
			directory: string | string[];
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
			const { files } = await parseForm(req);

			const file = files.media;

			const directory = Array.isArray(file)
				? file.map((f) => f.filepath)
				: file.filepath;

			const fileName = Array.isArray(file)
				? file.map((f) => f.newFilename)
				: file.newFilename;

			res.status(200).json({
				data: {
					url: `/uploads/${fileName}`,
					fileName,
					directory,
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
