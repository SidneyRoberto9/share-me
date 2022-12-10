import { ImgurClient as Imgur } from 'imgur';

export const ImgurClient = new Imgur({
	clientId: process.env.IMGUR_CLIENT_ID,
	clientSecret: process.env.IMGUR_CLIENT_SECRET,
	refreshToken: process.env.IMGUR_CLIENT_REFRESH_TOKEN,
});
