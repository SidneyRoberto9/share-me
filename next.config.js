/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	redirects: async () => {
		return [
			{
				source: '/profile',
				destination: '/',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
