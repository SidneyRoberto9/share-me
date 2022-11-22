import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';
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
		const { title, destination, category, image, imageName, email } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		const imagePath = `public/uploads/${imageName}`;

		const { data } = await client.upload({
			image: createReadStream(image) as any,
			title: title,
			type: 'stream',
		});

		const url: string = 'https://i.' + String(data.link).slice(10);

		await unlink(imagePath);

		const post = await prisma.post.create({
			data: {
				title: title,
				destination: destination,
				category: category,
				imageUrl: url,
				authorId: user.id,
				imageHash: data.deletehash,
			},
		});

		res.status(200).json({
			data: post,
		});
	}
}
