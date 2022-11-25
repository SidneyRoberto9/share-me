/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: [
			'',
			'i.imgur.com',
			'i.pinimg.com',
			'source.unsplash.com',
			'lh3.googleusercontent.com',
		],
	},
};

module.exports = nextConfig;
