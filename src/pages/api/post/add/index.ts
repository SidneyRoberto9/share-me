import { createReadStream, unlinkSync } from 'fs';
import { ImgurClient } from 'imgur';

import type { NextApiRequest, NextApiResponse } from 'next';
const client = new ImgurClient({
	clientId: process.env.IMGUR_CLIENT_ID,
	clientSecret: process.env.IMGUR_CLIENT_SECRET,
	refreshToken: process.env.IMGUR_CLIENT_REFRESH_TOKEN,
});

export default async function postsHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).json({
			data: null,
			error: 'Method Not Allowed',
		});
		return;
	}

	if (req.method === 'POST') {
		try {
			const { title, destination, category, image, imageName, email } =
				req.body;
			const imagePath = `public/uploads/${imageName}`;

			const { data } = await client.upload({
				image: createReadStream(image) as any,
				title: title,
				type: 'stream',
			});

			const url: string = 'https://i.' + String(data.link).slice(10);

			unlinkSync(imagePath);

			const user = await prisma.user.findUnique({
				where: {
					email: email,
				},
			});

			const post = await prisma.post.create({
				data: {
					title,
					destination,
					category,
					imageUrl: url,
					authorId: user.id,
				},
			});

			res.status(200).json({
				data: post,
			});
		} catch (e) {
			res.status(500).json({ data: null, error: 'Internal Server Error' });
		}
	}
}
